import { JsonIgnore, toJSON } from "../utils/json-ignore";
import { EntityClass, EntityID } from "@hassbuilder/types";
import { EntityTarget } from "../configuration";

/**
 * Describes a backend (Package) yaml output
 */
export class CreatableEntity<C extends EntityClass = EntityClass> implements EntityTarget<C> {
  @JsonIgnore
  entityClass: C;
  @JsonIgnore
  id: EntityID<C>;


  constructor(entityClass: C, id: EntityID<C>) {
    this.entityClass = entityClass;
    this.id = id;
  }

  public toJSON() {
    return toJSON.bind(this)();
  }
}
