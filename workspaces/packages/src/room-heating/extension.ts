import { BackendProvider, RoomExtension } from "@hassbuilder/base";
import { DesiredTemperatureTemplateSensor } from "./entities/desired-temperature.template";
import { AverageTemperatureTemplateSensor } from "./entities/average-temperature.template";

export interface RoomHeating extends BackendProvider {
  desiredTemperatureSensors: DesiredTemperatureTemplateSensor[];
  averageTemperatureSensor: AverageTemperatureTemplateSensor;
}

export const WithRoomHeating: RoomExtension<RoomHeating> = (room) => {
  const desiredTemperatureSensors = room.climates.map(
    (climate) => new DesiredTemperatureTemplateSensor(climate)
  );
  const averageTemperatureSensor = new AverageTemperatureTemplateSensor(
    room.name,
    room.climates
  );
  return {
    desiredTemperatureSensors,
    averageTemperatureSensor,
    sensors: [...desiredTemperatureSensors, averageTemperatureSensor],
  };
};
