import { HAInputBoolean } from "@hassforge/types";
import { CreatableEntity } from "../entity";
import { InputBooleanTarget } from "../../configuration";
import { snakeCase } from "change-case";

export class InputBoolean
  extends CreatableEntity<"input_boolean">
  implements HAInputBoolean, InputBooleanTarget
{
  name!: string;

  constructor(entity: HAInputBoolean) {
    super("input_boolean", `input_boolean.${snakeCase(entity.name)}`);
    Object.assign(this, entity);
  }
}
