import { HAInputNumber } from "@hassforge/types";
import { CreatableEntity } from "../entity";
import { InputNumberTarget } from "../../configuration";
import { snakeCase } from "change-case";

export class InputNumber
  extends CreatableEntity<"input_number">
  implements HAInputNumber, InputNumberTarget
{
  name!: string;
  min: number;
  max: number;

  constructor(entity: HAInputNumber) {
    super("input_number", `input_number.${snakeCase(entity.name)}`);
    Object.assign(this, entity);
  }
}
