import { CreatableEntity } from "./entity";
import { HASensor } from "@hassbuilder/types";
import { SensorTarget } from "../configuration";

export class Sensor
  extends CreatableEntity<"sensor", HASensor>
  implements HASensor, SensorTarget
{
  platform!: string;
  name!: string;
  entity_id!: string;
  state!: string;
  type!: string;
  start!: string;
  end!: string;

  constructor(entity: HASensor) {
    super("sensor", entity);
    Object.assign(this, entity);
  }
}
