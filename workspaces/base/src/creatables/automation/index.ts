import {
  HAAction,
  HACondition,
  HAAutomation,
  HATrigger,
} from "@hassforge/types";
import { snakeCase } from "change-case";
import { CreatableEntity } from "../entity";
import { omit } from "../../utils/omit";

export class Automation
  extends CreatableEntity<"automation">
  implements HAAutomation
{
  alias!: string;
  description?: string;
  initial_state?: boolean;
  trigger: HATrigger[] = [];
  condition: HACondition[] = [];
  action: HAAction[] = [];

  constructor(automation: HAAutomation) {
    super("automation", `automation.${snakeCase(automation.alias)}`);
    Object.assign(this, automation);
  }

  
  public override toJSON() {
    return omit(this, "entityClass") as any;
  }
}

export * from "./trigger";
export * from "./condition";
export * from "./action";
