import { SensorID } from "../id";

export interface HAGenericThermostat {
  platform: "generic_thermostat";
  unique_id: string;
  name: string;
  heater: string;
  target_sensor: SensorID;
  ac_mode: boolean;
  min_temp: number;
  max_temp: number;
  target_temp: number;
}

export type HAClimate = HAGenericThermostat;
