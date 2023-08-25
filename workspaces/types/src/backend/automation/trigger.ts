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

export type EventTrigger = {
  platform: "event";
  event_type: string;
  event_data?: Record<string, any>;
  context?: Record<string, any[]>;
};

export type HomeAssistantTrigger = {
  platform: "homeassistant";
  event: "start" | "shutdown";
};

export type MQTTTrigger = {
  platform: "mqtt";
  topic: string;
  payload?: string;
  qos?: number;
  encoding?: string;
};

export type NumericStateTrigger = {
  platform: "numeric_state";
  entity_id: string;
  attribute?: string;
  above?: number;
  below?: number;
};

export type StateTrigger = {
  platform: "state";
  entity_id: string;
  to?: string;
  from?: string;
  for?: string | number;
};

export type SunTrigger = {
  platform: "sun";
  event: "sunrise" | "sunset";
  offset?: string | number;
};

export type TagTrigger = {
  platform: "tag";
  tag_id: string;
};

export type TemplateTrigger = {
  platform: "template";
  value_template: string;
};

export type TimeTrigger = {
  platform: "time";
  at: string;
};

export type TimePatternTrigger = {
  platform: "time_pattern";
  hours?: string;
  minutes?: string;
  seconds?: string;
};

export type WebhookTrigger = {
  platform: "webhook";
  webhook_id: string;
};

export type ZoneTrigger = {
  platform: "zone";
  entity_id: string;
  zone: string;
  event: "enter" | "leave";
};

export type GeolocationTrigger = {
  platform: "geo_location";
  source: string;
  zone: string;
  event: "enter" | "leave";
};

export type DeviceTrigger = {
  platform: "device";
  device_id: string;
  domain: string;
  type: string;
  subtype?: string;
};

export type CalendarTrigger = {
  platform: "calendar";
  event: "start" | "end";
  entity_id: EntityID;
};
