import { Action, Condition, HAAutomation, Trigger } from "@hassbuilder/types";

export class Automation implements HAAutomation {
  alias!: string;
  trigger!: Trigger[];
  condition?: Condition[] | undefined;
  action!: Action[];
  initial_state?: boolean | undefined;

  constructor(automation: HAAutomation) {
    Object.assign(this, automation);
  }
}
