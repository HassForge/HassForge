import { omit } from "../utils/omit";
import { EntityClass, EntityID } from "@hassforge/types";
import { EntityTarget } from "../configuration";

/**
 * Describes a backend (Package) yaml output
 */
export class CreatableEntity<C extends EntityClass = EntityClass>
  implements EntityTarget<C>
{
  entityClass: C;
  id: EntityID<C>;

  constructor(entityClass: C, id: EntityID<C>) {
    this.entityClass = entityClass;
    this.id = id;
  }

  public toJSON() {
    return omit(this, "id", "entityClass");
  }
}
