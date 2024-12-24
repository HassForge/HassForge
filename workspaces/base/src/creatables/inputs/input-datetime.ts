import { HAInputDateTime } from "@hassforge/types";
import { CreatableEntity } from "../entity";
import { InputDateTimeTarget } from "../../configuration";
import { snakeCase } from "change-case";

export class InputDateTime
  extends CreatableEntity<"input_datetime">
  implements HAInputDateTime, InputDateTimeTarget
{
  name!: string;

  constructor(entity: HAInputDateTime) {
    super("input_datetime", `input_datetime.${snakeCase(entity.name)}`);
    Object.assign(this, entity);
  }
}
