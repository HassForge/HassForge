import { EntityClass, EntityID } from "@hassbuilder/types/src/id";

export interface EntityTarget<C extends EntityClass = EntityClass> {
  id: EntityID<C>;
  name: string;
}
