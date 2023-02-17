
export type EntityIDType = 'sensor' | 'switch'
export type SensorID = `sensor.${string}`;
export type SwitchID = `switch.${string}`;
export type EntityID = `${EntityIDType}.${string}`;

export interface Sensor {
  platform: string;
  name: string;
  entity_id: string;
  state: string;
  type: string;
  start: string;
  end: string;
}
