import {
  HAAction,
  HACondition,
  HAAutomation,
  HATrigger,
} from "@hassbuilder/types";

export class Automation implements HAAutomation {
  alias!: string;
  id?: string;
  description?: string;
  initial_state?: boolean;
  trigger: HATrigger[] = [];
  condition: HACondition[] = [];
  action: HAAction[] = [];

  constructor(automation: HAAutomation) {
    Object.assign(this, automation);
  }
}

export * from "./trigger";
export * from "./condition";
export * from "./action";
