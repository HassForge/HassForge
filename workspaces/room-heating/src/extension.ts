import { Room, RoomExtension } from "@hassforge/base";
import { DesiredTemperatureTemplateSensor } from "./entities/desired-temperature.template";
import { AverageTemperatureTemplateSensor } from "./entities/average-temperature.template";
import {
  averageTemperatureGraph,
  climateHeatingGraphRow,
  climateSwitchRows,
} from "./cards";
import { sentenceCase } from "change-case";

export class WithRoomHeating implements RoomExtension {
  desiredTemperatureSensors: DesiredTemperatureTemplateSensor[];
  averageTemperatureSensor: AverageTemperatureTemplateSensor;

  constructor(private room: Room) {
    this.desiredTemperatureSensors = room.climates.map(
      (climate) => new DesiredTemperatureTemplateSensor(climate)
    );
    this.averageTemperatureSensor = new AverageTemperatureTemplateSensor(
      room.name,
      room.climates
    );
  }

  get sensors() {
    return [...this.desiredTemperatureSensors, this.averageTemperatureSensor];
  }

  cards = {
    averageTemperatureGraph: () =>
      averageTemperatureGraph(
        this.averageTemperatureSensor,
        this.desiredTemperatureSensors
      ),

    climateSwitchRows: () => climateSwitchRows(this.room.climates),

    climateHeatingGraphRow: () =>
      climateHeatingGraphRow(this.desiredTemperatureSensors),

    roomHeating: () => ({
      type: "custom:vertical-stack-in-card",
      title: sentenceCase(this.room.name),
      cards: [
        ...(this.desiredTemperatureSensors.length > 1
          ? [this.cards.averageTemperatureGraph()]
          : []),
        this.cards.climateHeatingGraphRow(),
        ...this.cards.climateSwitchRows(),
      ],
    }),
  };
}
