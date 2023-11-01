import { HACondition } from "./condition";

export type HAAction =
  | CallServiceAction
  | ChooseAction
  | ConditionAction
  | DelayAction
  | DeviceAction
  | EventAction
  | RepeatAction
  | SceneAction
  | ScriptAction
  | WaitAction
  | WaitTemplateAction;

export type CallServiceAction = {
  service: string;
  target?: {
    entity_id?: string | string[];
    device_id?: string | string[];
  };
  data?: Record<string, any>;
  variables?: Record<string, any>;
};

export type ChooseAction = {
  choose: {
    conditions: HACondition | HACondition[];
    sequence: HAAction | HAAction[];
  }[];
  default?: HAAction | HAAction[];
};

export type ConditionAction = {
  condition: string;
  [key: string]: any;
};

export type Delay =
  | string
  | number
  | { seconds?: number; minutes?: number; hours?: number; days?: number };

export type DelayAction = {
  delay: Delay;
};

export type DeviceAction = {
  device_id: string;
  domain: string;
  type: string;
  subtype?: string;
  [key: string]: any;
};

export type EventAction = {
  event: string;
  event_data?: Record<string, any>;
  event_data_template?: Record<string, any>;
};

export type RepeatAction = {
  repeat: {
    sequence: HAAction | HAAction[];
    until?: HACondition | HACondition[];
    while?: HACondition | HACondition[];
    count?: number;
  };
};

export type SceneAction = {
  scene: string;
};

export type ScriptAction = {
  script: string;
};

export type WaitAction = {
  wait: {
    timeout: string | number;
    continue_on_timeout?: boolean;
  };
};

export type WaitTemplateAction = {
  wait_template: string;
  timeout?: string | number;
  continue_on_timeout?: boolean;
};
