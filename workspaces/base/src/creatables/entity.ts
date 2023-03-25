import { JsonIgnore, toJSON } from "../utils/json-ignore";
import { EntityClass, EntityID } from "@hassbuilder/types";

/**
 * Describes a backend (Package) yaml output
 */
export class CreatableEntity<C extends EntityClass = EntityClass> {
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
