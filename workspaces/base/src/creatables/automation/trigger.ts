import {
  EventTrigger,
  HomeAssistantTrigger,
  MQTTTrigger,
  NumericStateTrigger,
  StateTrigger,
  SunTrigger,
  TagTrigger,
  TemplateTrigger,
  TimeTrigger,
  TimePatternTrigger,
  WebhookTrigger,
  ZoneTrigger,
  GeolocationTrigger,
  DeviceTrigger,
  CalendarTrigger,
  CalendarID,
} from "@hassforge/types";

export namespace Trigger {
  export function event(
    event_type: string,
    options: Omit<EventTrigger, "platform" | "event_type">
  ): EventTrigger {
    return { platform: "event", event_type, ...options };
  }

  export function homeAssistant(
    event: "start" | "shutdown"
  ): HomeAssistantTrigger {
    return { platform: "homeassistant", event };
  }

  export function mqtt(
    topic: string,
    options: Omit<MQTTTrigger, "platform" | "topic">
  ): MQTTTrigger {
    return { platform: "mqtt", topic, ...options };
  }

  export function numericState(
    entity_id: string,
    options: Omit<NumericStateTrigger, "platform" | "entity_id">
  ): NumericStateTrigger {
    return { platform: "numeric_state", entity_id, ...options };
  }

  export function state(
    entity_id: string,
    options?: Omit<StateTrigger, "platform" | "entity_id">
  ): StateTrigger {
    return { platform: "state", entity_id, ...options };
  }

  export function sun(
    event: "sunrise" | "sunset",
    offset?: string | number
  ): SunTrigger {
    return { platform: "sun", event, offset };
  }

  export function tag(tag_id: string): TagTrigger {
    return { platform: "tag", tag_id };
  }

  export function template(value_template: string): TemplateTrigger {
    return { platform: "template", value_template };
  }

  export function time(at: string): TimeTrigger {
    return { platform: "time", at };
  }

  export function timePattern(
    options: Omit<TimePatternTrigger, "platform">
  ): TimePatternTrigger {
    return { platform: "time_pattern", ...options };
  }

  export function webhook(webhook_id: string): WebhookTrigger {
    return { platform: "webhook", webhook_id };
  }

  export function zone(
    entity_id: string,
    zone: string,
    event: "enter" | "leave"
  ): ZoneTrigger {
    return { platform: "zone", entity_id, zone, event };
  }

  export function geolocation(
    source: string,
    zone: string,
    event: "enter" | "leave"
  ): GeolocationTrigger {
    return { platform: "geo_location", source, zone, event };
  }

  export function device(
    options: Omit<DeviceTrigger, "platform">
  ): DeviceTrigger {
    return { platform: "device", ...options };
  }

  export function calendar(
    entity_id: CalendarID,
    options: Omit<CalendarTrigger, "platform" | "entity_id">
  ): CalendarTrigger {
    return { platform: "calendar", entity_id, ...options };
  }
}
