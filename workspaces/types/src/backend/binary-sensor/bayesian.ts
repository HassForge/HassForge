/**
 * Represents a Home Assistant Bayesian binary sensor.
 */
export interface HABayesianBinarySensor {
  platform: "bayesian";
  /**
   * The prior probability of the event (0 to 1).
   * At any point in time (ignoring all external influences) how likely is this event to be occurring?
   */
  prior: number;

  /**
   * The posterior probability at which the sensor should trigger to on.
   * Use higher values to reduce false positives (and increase false negatives).
   * Note: If the threshold is higher than the prior then the default state will be off.
   * @default 0.5
   */
  probability_threshold?: number;

  /**
   * Name of the sensor to use in the frontend.
   * @default "Bayesian Binary Sensor"
   */
  name: string;

  /**
   * An ID that uniquely identifies this bayesian entity.
   * If two entities have the same unique ID, Home Assistant will raise an exception.
   */
  unique_id?: string;

  /**
   * Sets the class of the device, changing the device state and icon that is displayed on the frontend.
   */
  device_class?: string;

  /**
   * The observations which should influence the probability that the given event is occurring.
   */
  observations: HABayesianBinarySensorObservation[];

  /**
   * Name of the entity to monitor.
   * Required for state and numeric_state.
   */
  entity_id?: string;

  /**
   * The entity state that defines the observation.
   * Required for state.
   */
  to_state?: string;

  /**
   * Defines the template to be used, should evaluate to true or false.
   * Required for template.
   */
  value_template?: string;
}

/**
 * Represents an observation used in a Home Assistant Bayesian binary sensor.
 */
interface HABayesianBinarySensorObservation {
  /**
   * The supported platforms are state, numeric_state, and template.
   * They are modeled after their corresponding triggers for automations,
   * requiring to_state (for state), below and/or above (for numeric_state)
   * and value_template (for template).
   */
  platform: "state" | "numberic_state" | "template";

  /**
   * Name of the entity to monitor.
   * Required for state and numeric_state.
   */
  entity_id?: string;

  /**
   * The entity state that defines the observation.
   * Required for state.
   */
  to_state?: string;

  /**
   * Defines the template to be used, should evaluate to true or false (for template).
   */
  value_template?: string;

  /**
   * Assuming the bayesian binary_sensor is true, the probability the entity state is occurring.
   */
  prob_given_true: number;

  /**
   * Assuming the bayesian binary_sensor is false the probability the entity state is occurring.
   */
  prob_given_false: number;
}
