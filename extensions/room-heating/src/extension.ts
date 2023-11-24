import {
  BinarySensorTarget,
  ClimateTarget,
  LightTarget,
  Provider,
  Room,
  SwitchTarget,
} from "@hassforge/base";
import { DesiredTemperatureTemplateSensor } from "./entities/desired-temperature.template";
import { AverageTemperatureTemplateSensor } from "./entities/average-temperature.template";
import {
  averageTemperatureGraph,
  climateHeatingGraphRow,
  climateSwitchRows,
} from "./cards";
import { sentenceCase } from "change-case";
import { HAAutomation } from "@hassforge/types";

export class WithRoomHeating implements Provider {
  static readonly id = "roomHeating";

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

  automations?: HAAutomation[] | undefined;
  climates?: ClimateTarget[] | undefined;
  binarySensors?: BinarySensorTarget[] | undefined;
  switches?: SwitchTarget[] | undefined;
  lights?: (SwitchTarget | LightTarget)[] | undefined;

  get sensors() {
    return [...this.desiredTemperatureSensors, this.averageTemperatureSensor];
  }

  components = {
    averageTemperatureGraph: () =>
      averageTemperatureGraph(
        this.averageTemperatureSensor,
        this.desiredTemperatureSensors
      ),
    climateSwitchRows: () => climateSwitchRows(this.room.climates),
    climateHeatingGraphRow: () =>
      climateHeatingGraphRow(this.desiredTemperatureSensors),
  };

  card = () => ({
    type: "custom:vertical-stack-in-card",
    title: sentenceCase(this.room.name),
    cards: [
      ...(this.desiredTemperatureSensors.length > 1
        ? [this.components.averageTemperatureGraph()]
        : []),
      this.components.climateHeatingGraphRow(),
      ...this.components.climateSwitchRows(),
    ],
  });
}
