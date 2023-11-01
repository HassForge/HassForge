import { HABinarySensor } from "@hassforge/types";
import { TrendBinarySensor } from "./trend-binary-sensor";

export * from "./trend-binary-sensor";

export const isCreatableBinarySensor = (x: unknown): x is HABinarySensor =>
  x instanceof TrendBinarySensor;
