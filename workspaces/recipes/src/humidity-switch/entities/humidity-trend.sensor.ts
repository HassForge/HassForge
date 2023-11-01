import { SensorTarget, TrendBinarySensor } from "@hassforge/base";

export interface HumidityTrendSensorOptions {
  name: string;
  target: SensorTarget;
  changePercent: number;
  timeSeconds: number;
  sampleCount: number;
}

/**
 * Examples: 
 * 
 * Tracks 3 humidity readings over 10 minutes. If the change is greater than 10%, evals to true. (10/(60*10))
 * ```
 * platform: trend
 *   sensors:
 *     master_bath_shower_occupancy:
 *       max_samples: 3
 *       entity_id: sensor.xiaomi_master_bath_humidity
 *       sample_duration: 600
 *       min_gradient: 0.01666
 * ```
 * Tracks 2 humidity readings over 5 minutes. If the change decrease is greater than 5%, evals to true. (-5/(60*5))
 * Bumped samples down from 4 to 2, because it was staying on way too long.
 * ```
 * platform: trend
 *   sensors:
 *     master_bath_shower_occupancy_off:
 *       max_samples: 2
 *       entity_id: sensor.xiaomi_master_bath_humidity
 *       sample_duration: 300
 *       min_gradient: -0.016666
 * ```
 */
export class HumidityTrendSensor extends TrendBinarySensor {
  constructor({
    target,
    name,
    changePercent,
    timeSeconds,
    sampleCount,
  }: HumidityTrendSensorOptions) {
    super({
      entity_id: target.id,
      friendly_name: `${name} humidity trend`,
      sample_duration: timeSeconds,
      min_gradient: changePercent / (timeSeconds * Math.abs(changePercent)),
      max_samples: sampleCount,
    });
  }
}
