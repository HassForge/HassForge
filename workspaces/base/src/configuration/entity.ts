import { Customize } from "@hassbuilder/types";
import { EntityClass, EntityID } from "@hassbuilder/types/src/id";

export type EntityCustomize = Omit<Customize, "friendly_name">;
export interface EntityTarget<C extends EntityClass = EntityClass>
  extends EntityCustomize {
  id: EntityID<C>;
  name?: string;
}
