import {
  BackendProvider,
  ClimateTarget,
  Room,
  RoomExtension,
} from "@hassbuilder/base";
import {
  BoilerBurningTemplateSensor,
  BoilerBurningTemplateSensorOptions,
  BoilerBurningTimeSensor,
  RadiatorHeatNeededTemplateSensor,
  TotalRadiatorsHeatRequestedSensor,
} from "./entities";
import { BoilerShutOffAutomation, BoilerTurnOnAutomation } from "./automation";

export interface SwitchBasedThermostat extends BackendProvider {
  boilerOptions: BoilerBurningTemplateSensorOptions;
  isBurningSensor: BoilerBurningTemplateSensor;
  burningTimeSensor: BoilerBurningTimeSensor;
  radiatorHeatNeededSensors: RadiatorHeatNeededTemplateSensor[];
  totalRadiatorsHeatRequestedSensor: TotalRadiatorsHeatRequestedSensor;
  boilerShutoffAutomation: BoilerShutOffAutomation;
  boilerTurnOnAutomation: BoilerTurnOnAutomation;
}

export interface SwitchBasedThermostatOptions {
  boilerOptions: BoilerBurningTemplateSensorOptions;
  rooms: Room[];
  includeClimate?: (room: Room, climate: ClimateTarget) => boolean;
}

export const WithSwitchBasedThermostat: RoomExtension<
  SwitchBasedThermostat,
  [SwitchBasedThermostatOptions]
> = (_, { boilerOptions, rooms, includeClimate }) => {
  const isBurningSensor = new BoilerBurningTemplateSensor(boilerOptions);
  const burningTimeSensor = new BoilerBurningTimeSensor(isBurningSensor);
  const radiatorHeatNeededSensors = rooms.flatMap((room) =>
    room.climates
      .filter((climate) => includeClimate?.(room, climate) ?? true)
      .map((target) => new RadiatorHeatNeededTemplateSensor(target))
  );
  const totalRadiatorsHeatRequestedSensor =
    new TotalRadiatorsHeatRequestedSensor(radiatorHeatNeededSensors);
  const boilerShutoffAutomation = new BoilerShutOffAutomation(
    totalRadiatorsHeatRequestedSensor,
    boilerOptions.haSwitch
  );
  const boilerTurnOnAutomation = new BoilerTurnOnAutomation(
    totalRadiatorsHeatRequestedSensor,
    boilerOptions.haSwitch
  );

  return {
    isBurningSensor,
    boilerOptions,
    boilerShutoffAutomation,
    boilerTurnOnAutomation,
    burningTimeSensor,
    radiatorHeatNeededSensors,
    totalRadiatorsHeatRequestedSensor,
    automations: [boilerShutoffAutomation, boilerTurnOnAutomation],
    sensors: [
      isBurningSensor,
      burningTimeSensor,
      ...radiatorHeatNeededSensors,
      totalRadiatorsHeatRequestedSensor,
    ],
  };
};
