import { Room } from "@hassbuilder/base";
import { sentenceCase } from "change-case";
import { RoomHeating } from "../extension";
import { averageTemperatureGraph } from "./average-temperature-graph";
import { climateHeatingGraphs } from "./climate-heating-graphs";
import { climateSwitchCards } from "./climate-switch-cards";

export const roomHeatingCard = (room: Room & RoomHeating) => ({
  type: "custom:vertical-stack-in-card",
  title: sentenceCase(room.name),
  cards: [
    ...(room.desiredTemperatureSensors.length > 1
      ? [averageTemperatureGraph(room)]
      : []),
    climateHeatingGraphs(room),
    ...climateSwitchCards(room),
  ],
});
