export interface HATrendBinarySensorMapSensor {
  entity_id: string;
  attribute?: string;
  device_class?: string;
  friendly_name: string;
  invert?: boolean;
  max_samples?: number;
  min_gradient?: string | number;
  sample_duration?: number;
}

export type HATrendBinarySensorMap = { [key: string]: HATrendBinarySensorMapSensor}

export interface HATrendBinarySensor {
  platform: "trend";
  sensors: HATrendBinarySensorMap
}
