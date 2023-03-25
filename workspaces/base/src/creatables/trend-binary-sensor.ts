import { CreatableEntity } from "./entity";
import { SensorTarget } from "../configuration";
import { HATrendBinarySensor } from "@hassbuilder/types";
import { snakeCase } from "change-case";
import { JsonIgnore } from "../utils";

export class TrendBinarySensor
  extends CreatableEntity<"sensor">
  implements HATrendBinarySensor, SensorTarget
{
  platform = "trend" as const;
  @JsonIgnore
  name: string;
  entity_id!: string;
  friendly_name!: string;
  attribute?: string;
  device_class?: string;
  invert?: boolean;
  max_samples?: number;
  min_gradient?: string | number;
  sample_duration?: number;

  constructor(entity: Omit<HATrendBinarySensor, "platform">) {
    super("sensor", `sensor.${snakeCase(entity.friendly_name)}`);
    Object.assign(this, entity);
    this.name = entity.friendly_name;
  }
}
