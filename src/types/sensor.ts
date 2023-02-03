export type SensorID = `sensor.${string}`;

export interface Sensor {
  platform: string;
  name: string;
  entity_id: string;
  state: string;
  type: string;
  start: string;
  end: string;
}
