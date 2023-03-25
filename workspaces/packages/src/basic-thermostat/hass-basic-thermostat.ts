import { HAPackage } from "@hassbuilder/types";
import { ClimateTarget } from "@hassbuilder/base";
import { BoilerTurnOnAutomation, BoilerShutOffAutomation } from "./automation";
import {
  BoilerBurningTimeSensor,
  BoilerBurningTemplateSensor,
  BoilerBurningTemplateSensorOptions,
  RadiatorHeatNeededTemplateSensor,
  TotalRadiatorsHeatRequestedSensor,
} from "./entities";
import {
  VerticalStackCard,
  MiniGraphCard,
  EntityRowCard,
} from "@hassbuilder/types";

export class HassBasicThermostatPackage implements HAPackage {
  boilerOptions: BoilerBurningTemplateSensorOptions;
  isBurningSensor: BoilerBurningTemplateSensor;
  burningTimeSensor: BoilerBurningTimeSensor;
  radiatorHeatNeededSensors: RadiatorHeatNeededTemplateSensor[];
  totalRadiatorsHeatRequestedSensor: TotalRadiatorsHeatRequestedSensor;
  boilerShutoffAutomation: BoilerShutOffAutomation;
  boilerTurnOnAutomation: BoilerTurnOnAutomation;

  constructor(options: {
    boiler: BoilerBurningTemplateSensorOptions;
    trvs: ClimateTarget[];
  }) {
    this.boilerOptions = options.boiler;
    this.isBurningSensor = new BoilerBurningTemplateSensor(options.boiler);
    this.burningTimeSensor = new BoilerBurningTimeSensor(this.isBurningSensor);
    this.radiatorHeatNeededSensors = options.trvs.map(
      (trv) => new RadiatorHeatNeededTemplateSensor(trv)
    );
    this.totalRadiatorsHeatRequestedSensor =
      new TotalRadiatorsHeatRequestedSensor(this.radiatorHeatNeededSensors);
    this.boilerShutoffAutomation = new BoilerShutOffAutomation(
      this.totalRadiatorsHeatRequestedSensor,
      options.boiler.haSwitch
    );
    this.boilerTurnOnAutomation = new BoilerTurnOnAutomation(
      this.totalRadiatorsHeatRequestedSensor,
      options.boiler.haSwitch
    );
  }

  card(): VerticalStackCard {
    const { id: boilerBurningSensorId } = this.isBurningSensor;
    const { id: boilerBurningTodaySensorId } = this.burningTimeSensor;
    const { id: totalRadsHeatNeededId } =
      this.totalRadiatorsHeatRequestedSensor;
    return {
      title: "Boiler",
      type: "custom:vertical-stack-in-card",
      cards: [
        {
          type: "custom:mini-graph-card",
          name: "On Time",
          entities: [boilerBurningSensorId],
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
        } as MiniGraphCard,
        {
          type: "custom:multiple-entity-row",
          entity: this.boilerOptions.haSwitch.id,
          toggle: true,
          entities: [
            {
              entity: boilerBurningTodaySensorId,
              name: "24h On Time",
            },
            {
              entity: totalRadsHeatNeededId,
              name: "Rad Heat Needed",
            },
          ],
          icon: "mdi:fire",
          name: "Boiler",
        } as EntityRowCard,
      ],
    };
  }

  get template() {
    return [
      {
        sensor: [
          this.isBurningSensor,
          ...this.radiatorHeatNeededSensors,
          this.totalRadiatorsHeatRequestedSensor,
        ],
      },
    ];
  }

  get sensor() {
    return [this.burningTimeSensor];
  }

  get automation() {
    return [this.boilerShutoffAutomation, this.boilerTurnOnAutomation];
  }
}
