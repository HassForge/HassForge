import { HAAction } from "./action";
import { HACondition } from "./condition";
import { HATrigger } from "./trigger";

export interface HAAutomation {
  alias: string;
  id?: string;
  description?: string;
  trigger: HATrigger[];
  condition?: HACondition[];
  action: HAAction[];
  mode?: "single" | "restart" | "queued" | "parallel";
  max?: number;
  max_exceeded?: "silent" | "warning" | "error";
};
