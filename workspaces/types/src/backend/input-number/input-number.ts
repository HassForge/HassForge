/**
 * HAInputNumber represents the structure of a numeric input configuration.
 * Multiple entries are allowed.
 */
export interface HAInputNumber {
  /**
   * Minimum value.
   * Required.
   */
  min: number;

  /**
   * Maximum value.
   * Required.
   */
  max: number;

  /**
   * Friendly name of the input.
   * Optional.
   */
  name?: string;

  /**
   * Initial value when Home Assistant starts.
   * Optional, defaults to the value at shutdown.
   */
  initial?: number;

  /**
   * Step value for incrementing/decrementing.
   * Optional, default: 1.
   * Smallest value allowed is 0.001.
   */
  step?: number;

  /**
   * Display mode of the input.
   * Optional, default: 'slider'.
   */
  mode?: 'slider' | 'box';

  /**
   * Unit of measurement in which the value is expressed.
   * Optional.
   */
  unit_of_measurement?: string;

  /**
   * Icon to display in front of the input element in the frontend.
   * Optional.
   */
  icon?: string;
}

export type HAInputNumberDictionary = {
  [id: string]: HAInputNumber;
};
