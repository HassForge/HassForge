import { HAInputText } from "@hassforge/types";
import { CreatableEntity } from "../entity";
import { InputTextTarget } from "../../configuration";
import { snakeCase } from "change-case";

export class InputText
  extends CreatableEntity<"input_text">
  implements HAInputText, InputTextTarget
{
  name!: string;

  constructor(entity: HAInputText) {
    super("input_text", `input_text.${snakeCase(entity.name)}`);
    Object.assign(this, entity);
  }
}
