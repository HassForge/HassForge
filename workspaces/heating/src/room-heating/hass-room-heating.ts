import { sentenceCase } from "change-case";
import {
  ClimateTarget,
  DEFAULT_SETPOINT_ATTRIBUTE,
  DEFAULT_TEMPERATURE_ATTRIBUTE,
} from "@hassbuilder/base";
import {
  HAPackage,
  EntityRowCard,
  HorizontalStackCard,
  MiniGraphCard,
  heatingColorThresholds,
  MiniGraphCardEntity,
  VerticalStackCard,
} from "@hassbuilder/types";
import { DesiredTemperatureTemplateSensor } from "./entities/desired-temperature.template";
import { AverageTemperatureTemplateSensor } from "./entities/average-temperature.template";

export interface Room {
  name: string;
  climates: ClimateTarget[];
}

export class HassRoomHeating implements HAPackage {
  name: string;
  climates: ClimateTarget[];

  desiredTemperatureSensors: DesiredTemperatureTemplateSensor[];
  averageTemperatureSensor: AverageTemperatureTemplateSensor;

  constructor({ name, climates }: Room) {
    this.name = name;
    this.climates = climates;
    this.desiredTemperatureSensors = climates.map(
      (climate) => new DesiredTemperatureTemplateSensor(climate)
    );
    this.averageTemperatureSensor = new AverageTemperatureTemplateSensor(
      name,
      climates
    );
  }

  graphRowsCard(): HorizontalStackCard {
    return {
      type: "horizontal-stack",
      cards: this.desiredTemperatureSensors.map(
        (desiredTemperatureTemplate): MiniGraphCard => {
          const climate = desiredTemperatureTemplate.parent;
          return {
            type: "custom:mini-graph-card",
            name: climate.name,
            line_width: 4,
            font_size: 75,
            points_per_hour: 15,
            color_thresholds: heatingColorThresholds,
            entities: [
              {
                entity: climate.id,
                attribute:
                  climate.temperatureAttribute ?? DEFAULT_TEMPERATURE_ATTRIBUTE,
              },
              {
                entity: desiredTemperatureTemplate.id,
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
          };
        }
      ),
    };
  }

  averageGraphCard() {
    return {
      type: "custom:mini-graph-card",
      name: this.averageTemperatureSensor.name,
      show: {
        labels: false,
      },
      line_width: 2,
      font_size: 75,
      points_per_hour: 20,
      color_thresholds: heatingColorThresholds,
      entities: [
        this.averageTemperatureSensor.id,
        ...this.desiredTemperatureSensors.map(
          ({ parent }): MiniGraphCardEntity => ({
            entity: parent.id,
            color: "#ffffff44",
            show_line: false,
            show_points: false,
            show_legend: false,
            y_axis: "secondary",
          })
        ),
      ],
    };
  }

  switchRowCards(): EntityRowCard[] {
    return this.climates.map((climate) => ({
      type: "custom:multiple-entity-row",
      entity: climate.id,
      icon: "mdi:fire",
      name: climate.name,
      toggle: true,
      state_header: "On/Off",
      entities: [
        {
          name: "Desired",
          attribute: climate.setpointAttribute ?? DEFAULT_SETPOINT_ATTRIBUTE,
        },
        {
          name: "Current",
          attribute:
            climate.temperatureAttribute ?? DEFAULT_TEMPERATURE_ATTRIBUTE,
        },
      ],
    }));
  }

  card(): VerticalStackCard {
    return {
      type: "custom:vertical-stack-in-card",
      title: sentenceCase(this.name),
      cards: [
        ...(this.climates.length > 1 ? [this.averageGraphCard()] : []),
        this.graphRowsCard(),
        ...this.switchRowCards(),
      ],
    };
  }

  get template() {
    return [
      {
        sensor: [
          ...this.desiredTemperatureSensors,
          this.averageTemperatureSensor,
        ],
      },
    ];
  }
}
