import { CreatableEntity } from "./entity";
import { SensorTarget } from "../configuration";
import {
  HATrendBinarySensor,
  HATrendBinarySensorMap,
  HATrendBinarySensorMapSensor,
} from "@hassforge/types";
import { snakeCase } from "change-case";

export class TrendBinarySensor
  extends CreatableEntity<"sensor">
  implements HATrendBinarySensor, SensorTarget
{
  platform = "trend" as const;
  sensors: HATrendBinarySensorMap = {};

  constructor(entity: HATrendBinarySensorMapSensor) {
    super("sensor", `sensor.${snakeCase(entity.friendly_name)}`);
    this.sensors[snakeCase(entity.friendly_name)] = entity;
  }
}
