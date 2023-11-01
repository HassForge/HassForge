import { EntityID } from "../../id";

export type HATrigger =
  | EventTrigger
  | HomeAssistantTrigger
  | MQTTTrigger
  | NumericStateTrigger
  | StateTrigger
  | SunTrigger
  | TagTrigger
  | TemplateTrigger
  | TimeTrigger
  | TimePatternTrigger
  | WebhookTrigger
  | ZoneTrigger
  | GeolocationTrigger
  | DeviceTrigger
  | CalendarTrigger;

export interface HATriggerCommon {
  id?: string;
}

export type EventTrigger = HATriggerCommon & {
  platform: "event";
  event_type: string;
  event_data?: Record<string, any>;
  context?: Record<string, any[]>;
};

export type HomeAssistantTrigger = HATriggerCommon & {
  platform: "homeassistant";
  event: "start" | "shutdown";
};

export type MQTTTrigger = HATriggerCommon & {
  platform: "mqtt";
  topic: string;
  payload?: string;
  qos?: number;
  encoding?: string;
};

export type NumericStateTrigger = HATriggerCommon & {
  platform: "numeric_state";
  entity_id: string;
  attribute?: string;
  above?: number;
  below?: number;
};

export type StateTrigger = HATriggerCommon & {
  platform: "state";
  entity_id: string;
  to?: string;
  from?: string;
  for?: string | number;
};

export type SunTrigger = HATriggerCommon & {
  platform: "sun";
  event: "sunrise" | "sunset";
  offset?: string | number;
};

export type TagTrigger = HATriggerCommon & {
  platform: "tag";
  tag_id: string;
};

export type TemplateTrigger = HATriggerCommon & {
  platform: "template";
  value_template: string;
};

export type TimeTrigger = HATriggerCommon & {
  platform: "time";
  at: string;
};

export type TimePatternTrigger = HATriggerCommon & {
  platform: "time_pattern";
  hours?: string;
  minutes?: string;
  seconds?: string;
};

export type WebhookTrigger = HATriggerCommon & {
  platform: "webhook";
  webhook_id: string;
};

export type ZoneTrigger = HATriggerCommon & {
  platform: "zone";
  entity_id: string;
  zone: string;
  event: "enter" | "leave";
};

export type GeolocationTrigger = HATriggerCommon & {
  platform: "geo_location";
  source: string;
  zone: string;
  event: "enter" | "leave";
};

export type DeviceTrigger = HATriggerCommon & {
  platform: "device";
  device_id: string;
  domain: string;
  type: string;
  subtype?: string;
};

export type CalendarTrigger = HATriggerCommon & {
  platform: "calendar";
  event: "start" | "end";
  entity_id: EntityID;
};
