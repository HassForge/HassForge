import { HAClimate } from "@hassforge/types";
import { GenericThermostatClimate } from "./generic-thermostat";

export * from "./generic-thermostat";

export const isCreatableClimate = (x: unknown): x is HAClimate =>
  x instanceof GenericThermostatClimate;
