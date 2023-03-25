export interface HATrendBinarySensor {
  platform: "trend";
  entity_id: string;
  attribute?: string;
  device_class?: string;
  friendly_name: string;
  invert?: boolean;
  max_samples?: number;
  min_gradient?: string | number;
  sample_duration?: number;
}
