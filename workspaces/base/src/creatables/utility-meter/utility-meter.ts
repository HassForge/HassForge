import { CreatableEntity } from "../entity";
import { SensorTarget } from "../../configuration";
import { HAUtilityMeter } from "@hassforge/types";
import { snakeCase } from "change-case";

export class UtilityMeter
  extends CreatableEntity<"sensor">
  implements HAUtilityMeter, SensorTarget
{
  source: string;

  constructor(entity: HAUtilityMeter) {
    super("sensor", `sensor.${snakeCase(entity.name)}`);
    Object.assign(this, entity);
  }
}
