import {
  AndCondition,
  EntityID,
  HACondition,
  NotCondition,
  NumericStateCondition,
  OrCondition,
  StateCondition,
  SunCondition,
  TemplateCondition,
  TimeCondition,
  TriggerCondition,
  ZoneCondition,
} from "@hassbuilder/types";

export namespace Condition {
  export function and(...conditions: HACondition[]): AndCondition {
    return { condition: "and", conditions: conditions };
  }

  export function not(...conditions: HACondition[]): NotCondition {
    return { condition: "not", conditions: conditions };
  }

  export function or(...conditions: HACondition[]): OrCondition {
    return { condition: "or", conditions: conditions };
  }

  export function numericState(
    entity_id: EntityID,
    options: Partial<NumericStateCondition>
  ): NumericStateCondition {
    return { condition: "numeric_state", entity_id, ...options };
  }

  export function state(
    entity_id: EntityID,
    options: Omit<StateCondition, "condition" | "entity_id">
  ): StateCondition {
    return { condition: "state", entity_id, ...options };
  }

  export function sun(options: Omit<SunCondition, "condition">): SunCondition {
    return { condition: "sun", ...options };
  }

  export function template(value_template: string): TemplateCondition {
    return { condition: "template", value_template };
  }

  export function time(
    options: Omit<TimeCondition, "condition">
  ): TimeCondition {
    return { condition: "time", ...options };
  }

  export function zone(entityId: EntityID, zone: string): ZoneCondition {
    return { condition: "zone", entity_id: entityId, zone };
  }

  export function trigger(triggerId: string): TriggerCondition {
    return { condition: "trigger", id: triggerId };
  }
}
