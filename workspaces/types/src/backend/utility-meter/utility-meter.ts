/**
 * HAUtilityMeter represents the structure of a utility meter configuration.
 * It allows tracking of various utility readings like energy, water, gas, etc.
 */
export interface HAUtilityMeter {
  /**
   * The entity ID of the sensor providing utility readings.
   * Required.
   */
  source: string;

  /**
   * The friendly name to use in the GUI.
   * Optional.
   */
  name?: string;

  /**
   * An ID that uniquely identifies the utility_meter.
   * Set this to a unique value to allow customization through the UI.
   * Optional.
   */
  unique_id?: string;

  /**
   * How often to reset the counter.
   * Optional.
   */
  cycle?: 'quarter-hourly' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'bimonthly' | 'quarterly' | 'yearly';

  /**
   * Cycle reset offset.
   * Optional, default: 0
   * Can be a string in 'HH:MM:SS' or 'HH:MM' format,
   * or an object with days/hours/minutes.
   */
  offset?: string | {
    days?: number;
    hours?: number;
    minutes?: number;
  };

  /**
   * Advanced method of defining when the counter should be reset.
   * Follows crontab syntax.
   * Mutually exclusive with cycle and offset.
   */
  cron?: string;

  /**
   * Set to true if source values are delta values since last reading.
   * Optional, default: false
   */
  delta_values?: boolean;

  /**
   * Set to true to treat the source as a net meter.
   * Optional, default: false
   */
  net_consumption?: boolean;

  /**
   * List of tariffs supported by the utility meter.
   * Optional, default: []
   */
  tariffs?: string[];

  /**
   * Enable if source sensor state resets to 0.
   * Optional, default: true
   */
  periodically_resetting?: boolean;

  /**
   * If true, sensor will always be available with last totalized value.
   * Optional, default: false
   */
  always_available?: boolean;
}

export type HAUtilityMeterDictionary = {
  [id: string]: HAUtilityMeter;
};
