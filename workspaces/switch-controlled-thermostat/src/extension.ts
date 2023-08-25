import { ClimateTarget, Room, RoomExtension } from "@hassforge/base";
import {
  BoilerBurningTemplateSensor,
  BoilerBurningTemplateSensorOptions,
  BoilerBurningTimeSensor,
  RadiatorHeatNeededTemplateSensor,
  TotalRadiatorsHeatRequestedSensor,
} from "./entities";
import { BoilerShutOffAutomation, BoilerTurnOnAutomation } from "./automation";
import { boilerBurningGraph, boilerSwitchStatsRow } from "./cards";

export interface SwitchControlledThermostatOptions {
  boilerOptions: BoilerBurningTemplateSensorOptions;
  rooms: Room[];
  includeClimate?: (room: Room, climate: ClimateTarget) => boolean;
}

export class WithSwitchControlledThermostat implements RoomExtension {
  boilerOptions: BoilerBurningTemplateSensorOptions;
  isBurningSensor: BoilerBurningTemplateSensor;
  burningTimeSensor: BoilerBurningTimeSensor;
  radiatorHeatNeededSensors: RadiatorHeatNeededTemplateSensor[];
  totalRadiatorsHeatRequestedSensor: TotalRadiatorsHeatRequestedSensor;
  boilerShutoffAutomation: BoilerShutOffAutomation;
  boilerTurnOnAutomation: BoilerTurnOnAutomation;

  constructor(
    _: Room,
    { boilerOptions, rooms, includeClimate }: SwitchControlledThermostatOptions
  ) {
    this.boilerOptions = boilerOptions;
    this.isBurningSensor = new BoilerBurningTemplateSensor(boilerOptions);
    this.burningTimeSensor = new BoilerBurningTimeSensor(this.isBurningSensor);
    this.radiatorHeatNeededSensors = rooms.flatMap((room) =>
      room.climates
        .filter((climate) => includeClimate?.(room, climate) ?? true)
        .map((target) => new RadiatorHeatNeededTemplateSensor(target))
    );
    this.totalRadiatorsHeatRequestedSensor =
      new TotalRadiatorsHeatRequestedSensor(this.radiatorHeatNeededSensors);
    this.boilerShutoffAutomation = new BoilerShutOffAutomation(
      this.totalRadiatorsHeatRequestedSensor,
      boilerOptions.haSwitch
    );
    this.boilerTurnOnAutomation = new BoilerTurnOnAutomation(
      this.totalRadiatorsHeatRequestedSensor,
      boilerOptions.haSwitch
    );
  }

  get sensors() {
    return [
      this.burningTimeSensor,
      this.isBurningSensor,
      this.totalRadiatorsHeatRequestedSensor,
      ...this.radiatorHeatNeededSensors,
    ];
  }

  get automations() {
    return [this.boilerShutoffAutomation, this.boilerTurnOnAutomation];
  }

  cards = {
    boilerBurningGraph: () => boilerBurningGraph(this.isBurningSensor),
    boilerSwitchStatsRow: () => boilerSwitchStatsRow(this),
    switchControlledThermostatCard: (title: string = "Thermostat") => ({
      title,
      type: "custom:vertical-stack-in-card",
      cards: [this.cards.boilerBurningGraph, this.cards.boilerSwitchStatsRow()],
    }),
  };
}
