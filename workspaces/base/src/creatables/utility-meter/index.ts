import { HAUtilityMeter } from "@hassforge/types";
import { UtilityMeter } from "./utility-meter";

export * from "./utility-meter";

export const isCreatableUtilityMeter = (x: unknown): x is HAUtilityMeter =>
  x instanceof UtilityMeter;
