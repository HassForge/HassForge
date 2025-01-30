import { HAInputBoolean, HAInputDateTime, HAInputNumber, HAInputText } from "@hassforge/types";
import { InputBoolean } from "./input-boolean";
import { InputDateTime } from "./input-datetime";
import { InputText } from "./input-text";
import { InputNumber } from "./input-number";

export * from "./input-boolean";
export * from "./input-datetime";
export * from "./input-text";
export * from "./input-number";

export const isCreatableInputBoolean = (x: unknown): x is HAInputBoolean =>
  x instanceof InputBoolean;
export const isCreatableInputDateTime = (x: unknown): x is HAInputDateTime =>
  x instanceof InputDateTime;
export const isCreatableInputText = (x: unknown): x is HAInputText =>
  x instanceof InputText;
export const isCreatableInputNumber = (x: unknown): x is HAInputNumber =>
  x instanceof InputNumber;
