import { Customize } from "@hassforge/types";
import { EntityClass, EntityID } from "@hassforge/types";

export type EntityCustomize = Omit<Customize, "friendly_name">;
export interface EntityTarget<C extends EntityClass = EntityClass>
  extends EntityCustomize {
  id: EntityID<C>;
  name?: string;
}
