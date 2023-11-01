import { HALight } from "@hassforge/types";
import { LightGroup } from "./group";

export * from "./group";

export const isCreatableLight = (x: unknown): x is HALight =>
  x instanceof LightGroup;
