import { snakeCase } from "change-case";
import { JsonIgnore, toJson } from "../utils/json-ignore";
import { EntityClass, EntityID } from "@hassbuilder/types";

/**
 * Describes a backend (Package) yaml output
 */
export class CreatableEntity<
  C extends EntityClass = EntityClass,
  E extends { name: string } = { name: string }
> {
  @JsonIgnore
  entityClass: C;
  @JsonIgnore
  entity: E;
  @JsonIgnore
  id: EntityID<C>;

  constructor(entityClass: C, entity: E) {
    this.entity = entity;
    this.entityClass = entityClass;
    this.id = `${entityClass}.${snakeCase(entity.name)}`;
  }

  toJson() {
    return toJson();
  }
}
