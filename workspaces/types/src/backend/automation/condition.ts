export type HACondition =
  | AndCondition
  | OrCondition
  | NotCondition
  | NumericStateCondition
  | StateCondition
  | SunCondition
  | TemplateCondition
  | TimeCondition
  | ZoneCondition
  | TriggerCondition;

export type AndCondition = {
  condition: "and";
  conditions: HACondition[];
};

export type OrCondition = {
  condition: "or";
  conditions: HACondition[];
};

export type NotCondition = {
  condition: "not";
  conditions: HACondition[];
};

export type NumericStateCondition = {
  condition: "numeric_state";
  entity_id: string;
  attribute?: string;
  above?: number;
  below?: number;
};

export type StateCondition = {
  condition: "state";
  entity_id: string;
  state?: string;
  attribute?: string;
  for?: string | number;
};

export type SunCondition = {
  condition: "sun";
  before?: "sunrise" | "sunset";
  after?: "sunrise" | "sunset";
  before_offset?: string | number;
  after_offset?: string | number;
};

export type TemplateCondition = {
  condition: "template";
  value_template: string;
};

export type TimeCondition = {
  condition: "time";
  after?: string;
  before?: string;
  weekday?: string | string[];
};

export type ZoneCondition = {
  condition: "zone";
  entity_id: string;
  zone: string;
};

export type TriggerCondition = {
  condition: "trigger";
  id: string;
};
