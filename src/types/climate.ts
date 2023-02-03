export interface Climate {
  platform: string;
  unique_id: string;
  name: string;
  heater: string;
  target_sensor: string;
  ac_mode: boolean;
  min_temp: number;
  max_temp: number;
  target_temp: number;
}

export interface ClimateTarget {
  name: string;
  climateId: string;
  temperatureAttribute: string;
  setpointAttribute: string;
  heatModeAttribute: string;
}
