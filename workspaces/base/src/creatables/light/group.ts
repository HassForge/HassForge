import { CreatableEntity } from "../entity";
import { LightTarget } from "../../configuration";
import { snakeCase } from "change-case";
import { LightID } from "@hassforge/types";
import { HALightGroup } from "@hassforge/types";

export class LightGroup
  extends CreatableEntity<"light">
  implements HALightGroup, LightTarget
{
  platform = "group" as const;

  constructor(entity: Omit<HALightGroup, "platform">) {
    super("light", `light.${snakeCase(entity.name)}`);
    Object.assign(this, entity);
  }

  entities!: LightID[];
  name!: string;
  unique_id?: string;
  all?: boolean;
}
