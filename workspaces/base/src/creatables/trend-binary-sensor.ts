import { CreatableEntity } from "./entity";
import { BinarySensorTarget } from "../configuration";
import {
  HATrendBinarySensor,
  HATrendBinarySensorMap,
  HATrendBinarySensorMapSensor,
} from "@hassforge/types";
import { snakeCase } from "change-case";

export class TrendBinarySensor
  extends CreatableEntity<"binary_sensor">
  implements HATrendBinarySensor, BinarySensorTarget
{
  platform = "trend" as const;
  sensors: HATrendBinarySensorMap = {};

  constructor(entity: HATrendBinarySensorMapSensor) {
    super("binary_sensor", `binary_sensor.${snakeCase(entity.friendly_name)}`);
    this.sensors[snakeCase(entity.friendly_name)] = entity;
  }
}
