import { HAInputBoolean, HAInputDateTime } from "@hassforge/types";
import { InputBoolean } from "./input-boolean";
import { InputDateTime } from "./input-datetime";

export * from "./input-boolean";
export * from "./input-datetime";

export const isCreatableInputBoolean = (x: unknown): x is HAInputBoolean =>
  x instanceof InputBoolean;
export const isCreatableInputDateTime = (x: unknown): x is HAInputDateTime =>
  x instanceof InputDateTime;
