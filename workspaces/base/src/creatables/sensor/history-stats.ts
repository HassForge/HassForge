import { CreatableEntity } from "../entity";
import { SensorTarget } from "../../configuration";
import { snakeCase } from "change-case";
import { HAHistoryStatsSensor } from "@hassforge/types";

export class HistoryStatsSensor
  extends CreatableEntity<"sensor">
  implements HAHistoryStatsSensor, SensorTarget
{
  platform = "history_stats" as const;

  constructor(entity: Omit<HAHistoryStatsSensor, "platform">) {
    super("sensor", `sensor.${snakeCase(entity.name)}`);
    Object.assign(this, entity);
  }

  name!: string;
  entity_id!: string;
  state!: string;
  type!: string;
  start?: string;
  end?: string;
  duration?: {
    minutes?: number;
    seconds?: number;
    hours?: number;
    days?: number;
  };
}
