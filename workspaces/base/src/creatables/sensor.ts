import { CreatableEntity } from "./entity";
import { HASensor } from "@hassforge/types";
import { SensorTarget } from "../configuration";
import { snakeCase } from "change-case";

export class Sensor
  extends CreatableEntity<"sensor">
  implements HASensor, SensorTarget
{
  platform!: string;
  name!: string;
  entity_id!: string;
  state!: string;
  type!: string;
  start?: string;
  end?: string;

  constructor(entity: HASensor) {
    super("sensor", `sensor.${snakeCase(entity.name)}`);
    Object.assign(this, entity);
  }
}
