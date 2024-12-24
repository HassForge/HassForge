/**
 * HAInputDateTime represents the structure of a datetime input configuration.
 * Multiple entries are allowed.
 */
export interface HAInputDateTime {
  /**
   * Friendly name of the datetime input.
   * Optional.
   */
  name: string;

  /**
   * Set to true if the input should have a time.
   * At least one of has_time or has_date must be defined.
   * Optional, default: false.
   */
  has_time?: boolean;

  /**
   * Set to true if the input should have a date.
   * At least one of has_time or has_date must be defined.
   * Optional, default: false.
   */
  has_date?: boolean;

  /**
   * Icon to display in front of the input element in the frontend.
   * Optional.
   */
  icon?: string;

  /**
   * Set the initial value of this input, depending on has_time and has_date.
   * Can be a datetime, time, or date.
   * Optional.
   * Default: 00:00 | 00:00 |
   */
  initial?: string;
}

export type HAInputDateTimeDictionary = {
  [id: string]: HAInputDateTime;
};
