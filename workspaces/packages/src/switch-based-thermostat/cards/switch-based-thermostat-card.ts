import { VerticalStackInCard } from "@hassbuilder/types";
import { SwitchBasedThermostat } from "../extension";
import { boilerBurningGraph } from "./boiler-burning-graph";
import { boilerSwitchStatsRow } from "./boiler-switch-stats-row";

export const switchBasedThermostatCard = (
  extension: SwitchBasedThermostat,
  title: string = "Thermostat"
): VerticalStackInCard => {
  return {
    title,
    type: "custom:vertical-stack-in-card",
    cards: [boilerBurningGraph(extension), boilerSwitchStatsRow(extension)],
  };
};
