import { Package } from "./types";
import {
  Card,
  EntityRowCard,
  MiniGraphCard,
  VerticalStackCard,
} from "./types/frontend";
import { ClimateTarget } from "./types/climate";
import { TemplateSensor } from "./types/template";
import { Sensor, SensorID } from "./types/sensor";
import { Automation } from "./types/automation";
import { snakeCase } from "change-case";

export interface Output {
  packages: { [fileName: string]: Package };
  frontends: { [fileName: string]: Card };
}

interface BoilerConfig {
  switchID: string;
  powerConsumptionSensorID: string;
  powerConsumptionSensorStandbyRange: [number, number];
}

export class BoilerBuilder {
  boilerConfig: BoilerConfig;
  climates: ClimateTarget[] = [];

  constructor(boilerConfig: BoilerConfig) {
    this.boilerConfig = boilerConfig;
  }

  addClimate(...targets: ClimateTarget[]) {
    this.climates = [...this.climates, ...targets];
    return this;
  }

  private boilerBurningSensor(): [SensorID, TemplateSensor] {
    const {
      powerConsumptionSensorID,
      powerConsumptionSensorStandbyRange,
      switchID,
    } = this.boilerConfig;
    return [
      "sensor.boiler_burning",
      {
        name: "Boiler Burning",
        unique_id: "boiler_burning",
        state: `
    {% if is_state('${switchID}', 'off') %}
      off
    {% elif states('${powerConsumptionSensorID}') | float < ${powerConsumptionSensorStandbyRange[0]} %}
      standby
    {% elif states('${powerConsumptionSensorID}') | float > ${powerConsumptionSensorStandbyRange[1]} %}
      on
    {% else %}
      failed
    {% endif %}
`,
      },
    ];
  }

  private boilerBurningTodaySensor(): [SensorID, Sensor] {
    return [
      "sensor.boiler_burning_today",
      {
        platform: "history_stats",
        name: "Boiler burning today",
        entity_id: this.boilerBurningSensor()[0],
        state: "on",
        type: "time",
        start:
          "{{ now().replace(day=now().day-1, month=now().month, hour=now().hour, minute=now().minute, second=now().second, microsecond=0) }}",
        end: "{{ now() }}",
      },
    ];
  }

  private radiatorsRequestingHeatSensor(): [SensorID, TemplateSensor] {
    const sets = this.climates.map(
      ({
        climateId,
        setpointAttribute,
        temperatureAttribute,
        heatModeAttribute,
      }) => `
{% if state_attr('${climateId}', '${temperatureAttribute}') < state_attr('${climateId}', '${setpointAttribute}') and state_attr('${climateId}', '${heatModeAttribute}') != "off"  %}
    {% set requesting = requesting + 1 %}
{% endif %}`
    );
    return [
      "sensor.radiators_requesting_heat",
      {
        name: "Radiators Requesting Heat",
        unique_id: "radiators_requesting_heat",
        state: `{% set requesting = 0 %}
            ${sets.join("")}
{{ requesting }}`,
        attributes: this.climates.reduce(
          (
            prev,
            { climateId, name, temperatureAttribute, setpointAttribute }
          ) => ({
            ...prev,
            [`${snakeCase(
              name
            )}_diff`]: `{{ state_attr('${climateId}', '${temperatureAttribute}') - state_attr('${climateId}', '${setpointAttribute}') | float }}`,
          }),
          {} as { [key: string]: string }
        ),
      },
    ];
  }

  private boilerShutOffAutomation(): Automation {
    const [radiatorsRequestingHeatSensorID] =
      this.radiatorsRequestingHeatSensor();
    return {
      alias: "Turn off boiler when all rads satisfied",
      trigger: [
        {
          platform: "state",
          entity_id: radiatorsRequestingHeatSensorID,
        },
      ],
      condition: [
        {
          condition: "template",
          value_template: `{{ states('${radiatorsRequestingHeatSensorID}') | float == 0 }}`,
        },
      ],
      action: [
        {
          service: "switch.turn_off",
          target: {
            entity_id: this.boilerConfig.switchID,
          },
        },
      ],
    };
  }

  private boilerTurnOnAutomation(): Automation {
    const [radiatorsRequestingHeatSensorID] =
      this.radiatorsRequestingHeatSensor();
    return {
      alias: "Turn on boiler when heat needed",
      trigger: [
        {
          platform: "state",
          entity_id: radiatorsRequestingHeatSensorID,
        },
      ],
      condition: [
        {
          condition: "template",
          value_template: `{{ states('${radiatorsRequestingHeatSensorID}') | float > 0 }}`,
        },
      ],
      action: [
        {
          service: "switch.turn_on",
          target: {
            entity_id: this.boilerConfig.switchID,
          },
        },
      ],
    };
  }

  buildBackend(): Package {
    return {
      sensor: [this.boilerBurningTodaySensor()[1]],
      template: [
        {
          sensor: [
            this.boilerBurningSensor()[1],
            this.radiatorsRequestingHeatSensor()[1],
          ],
        },
      ],
      automation: [
        this.boilerShutOffAutomation(),
        this.boilerTurnOnAutomation(),
      ],
    };
  }

  buildFrontend(): VerticalStackCard {
    const [boilerBurningSensorID] = this.boilerBurningSensor();
    const [boilerBurningTodaySensorID] = this.boilerBurningTodaySensor();
    const [radiatorsRequestingHeatSensorID] =
      this.radiatorsRequestingHeatSensor();
    const graph: MiniGraphCard = {
      type: "custom:mini-graph-card",
      name: "On Time",
      entities: [boilerBurningSensorID],
      line_width: 2,
      font_size: 75,
      smoothing: false,
      hours_to_show: 3,
      points_per_hour: 60,
      color_thresholds: [
        { color: "#0e7490", value: "off" },
        { color: "#64748b", value: "standby" },
        { color: "#ea580c", value: "on" },
      ],
      color_thresholds_transition: "hard",
      state_map: [
        { value: "off", label: "Off" },
        { value: "standby", label: "Standby" },
        { value: "on", label: "On" },
      ],
    };

    const boiler: EntityRowCard = {
      type: "custom:multiple-entity-row",
      entity: this.boilerConfig.switchID,
      toggle: true,
      entities: [
        {
          entity: boilerBurningTodaySensorID,
          name: "24h On Time",
        },
        {
          entity: radiatorsRequestingHeatSensorID,
          name: "Rad Heat Needed",
        },
      ],
      icon: "mdi:fire",
      name: "Boiler",
    };
    return {
      title: "Boiler",
      type: "custom:vertical-stack-in-card",
      cards: [graph, boiler],
    };
  }
}
