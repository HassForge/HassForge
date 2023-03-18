export interface HAAutomation {
  alias: string;
  trigger: Trigger[];
  condition?: Condition[];
  action: Action[];
  initial_state?: boolean;
}

export interface Action {
  service: string;
  target?: Target;
  data?: Data;
}

export interface Data {
  message: string;
  title?: string;
}

export interface Target {
  entity_id: string;
}

export interface Condition {
  condition: string;
  entity_id?: string;
  state?: string;
  after?: string;
  before?: string;
  value_template?: string;
}

export interface Trigger {
  platform: string;
  event?: string;
  offset?: string;
  entity_id?: string;
  to?: string;
  zone?: string;
  event_type?: string;
  event_data?: Target;
}
