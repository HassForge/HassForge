import { snakeCase, sentenceCase } from "change-case";
import {
  generateAverageTemperatureTemplateSensor,
  generateDesiredTemperatureTemplateSensor,
} from "./generators";
import { Package } from "./types";
import { Climate, ClimateTarget } from "./types/climate";
import {
  EntityRowCard,
  HorizontalStackCard,
  MiniGraphCard,
  MiniGraphCardColorThresholds,
  MiniGraphCardEntity,
  VerticalStackCard,
} from "./types/frontend";
import { CustomizeDictionary } from "./types/homeassistant";
import { SensorID, SwitchID } from "./types/sensor";

const colorThresholds: MiniGraphCardColorThresholds = [
  { value: 10, color: "#0284c7" },
  { value: 15, color: "#f39c12" },
  { value: 20, color: "#c0392b" },
];

interface GenericThermostat {
  name: string;
  climateIdOverride?: string;
  heater: SwitchID;
  targetSensor: SensorID;
}

export interface Room {
  name: string;
  climates: ClimateTarget[];
}

export class RoomBuilder {
  name: string;
  genericThermostats: GenericThermostat[] = [];
  climates: ClimateTarget[] = [];
  trvs: ClimateTarget[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addClimate(climate: ClimateTarget) {
    this.climates.push(climate);
    return this;
  }

  addTRV(
    climate: Omit<
      ClimateTarget,
      "heatModeAttribute" | "temperatureAttribute" | "setpointAttribute"
    >
  ) {
    const fullClimate = {
      ...climate,
      heatModeAttribute: "system_mode",
      temperatureAttribute: "local_temperature",
      setpointAttribute: "current_heating_setpoint",
    };
    this.trvs.push(fullClimate);
    return this.addClimate(fullClimate);
  }

  addGenericThermostat(thermostat: GenericThermostat) {
    this.genericThermostats.push(thermostat);
    return this.addClimate({
      name: thermostat.name,
      climateId:
        thermostat.climateIdOverride ??
        `climate.${snakeCase(this.name)}_${snakeCase(thermostat.name)}`,
      heatModeAttribute: "hvac_action",
      setpointAttribute: "temperature",
      temperatureAttribute: "current_temperature",
    });
  }

  averageTemperatureSensor() {
    return [
      this.climates,
      ...generateAverageTemperatureTemplateSensor(this.name, this.climates),
    ] as const;
  }

  desiredTemperatureSensors() {
    return this.climates.map(
      (climate) =>
        [
          climate,
          ...generateDesiredTemperatureTemplateSensor(this.name, climate),
        ] as const
    );
  }

  buildBackend(): Package {
    const friendlyNames = this.climates.reduce(
      (prev, { climateId, name }) => ({
        ...prev,
        [climateId]: { friendly_name: sentenceCase(`${this.name} ${name}`) },
      }),
      {} as CustomizeDictionary
    );
    return {
      homeassistant: {
        customize: {
          ...friendlyNames,
        },
      },
      template: [
        {
          sensor: [
            this.averageTemperatureSensor()[2],
            ...this.desiredTemperatureSensors().flatMap((x) => x[2]),
          ],
        },
      ],
      climate: this.genericThermostats.map<Climate>((thermostat) => ({
        platform: "generic_thermostat",
        unique_id: `${snakeCase(this.name)}_${snakeCase(thermostat.name)}`,
        name: `${sentenceCase(`${this.name} ${thermostat.name}`)}`,
        heater: thermostat.heater,
        target_sensor: thermostat.targetSensor,
        ac_mode: false,
        min_temp: 10,
        max_temp: 25,
        target_temp: 21,
      })),
    };
  }

  buildFrontend(): VerticalStackCard {
    const [_, averageSensorID, averageSensor] = this.averageTemperatureSensor();
    const desiredTemperatureSensors = this.desiredTemperatureSensors();
    const averageSensorCard: MiniGraphCard = {
      type: "custom:mini-graph-card",
      name: averageSensor.name,
      show: {
        labels: false,
      },
      line_width: 2,
      font_size: 75,
      points_per_hour: 20,
      color_thresholds: colorThresholds,
      entities: [
        averageSensorID,
        ...desiredTemperatureSensors.map(
          ([climate]): MiniGraphCardEntity => ({
            entity: climate.climateId,
            color: "#ffffff44",
            show_line: false,
            show_points: false,
            show_legend: false,
            y_axis: "secondary",
          })
        ),
      ],
    };
    const graphRows: HorizontalStackCard = {
      type: "horizontal-stack",
      cards: desiredTemperatureSensors.map(
        ([climate, sensorID]): MiniGraphCard => ({
          type: "custom:mini-graph-card",
          name: climate.name,
          line_width: 4,
          font_size: 75,
          points_per_hour: 15,
          color_thresholds: colorThresholds,
          entities: [
            {
              entity: climate.climateId,
              attribute: climate.temperatureAttribute,
            },
            {
              entity: sensorID,
              color: "white",
              show_line: false,
              show_points: false,
              show_legend: false,
              y_axis: "secondary",
            },
          ],
          show: {
            labels: false,
          },
        })
      ),
    };

    const rows = this.climates.map(
      (climate): EntityRowCard => ({
        type: "custom:multiple-entity-row",
        entity: climate.climateId,
        icon: "mdi:fire",
        name: climate.name,
        toggle: true,
        state_header: "On/Off",
        entities: [
          { name: "Desired", attribute: climate.setpointAttribute },
          { name: "Current", attribute: climate.temperatureAttribute },
        ],
      })
    );

    return {
      type: "custom:vertical-stack-in-card",
      title: sentenceCase(this.name),
      cards: [
        ...(this.climates.length > 1 ? [averageSensorCard] : []),
        graphRows,
        ...rows,
      ],
    };
  }
}
