import { HATemplate } from "@hassforge/types";
import { TemplateSensor } from "./sensor";

export * from "./sensor";

export const isCreatableTemplate = (x: unknown): x is HATemplate =>
  x instanceof TemplateSensor;
