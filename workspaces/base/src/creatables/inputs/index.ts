import { HAInputBoolean, HAInputDateTime, HAInputText } from "@hassforge/types";
import { InputBoolean } from "./input-boolean";
import { InputDateTime } from "./input-datetime";
import { InputText } from "./input-text";

export * from "./input-boolean";
export * from "./input-datetime";
export * from "./input-text";

export const isCreatableInputBoolean = (x: unknown): x is HAInputBoolean =>
  x instanceof InputBoolean;
export const isCreatableInputDateTime = (x: unknown): x is HAInputDateTime =>
  x instanceof InputDateTime;
export const isCreatableInputText = (x: unknown): x is HAInputText =>
  x instanceof InputText;
