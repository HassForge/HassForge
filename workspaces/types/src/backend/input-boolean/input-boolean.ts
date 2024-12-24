/**
 * HAInputBoolean represents the structure of a boolean input configuration.
 * Multiple entries are allowed.
 */
export interface HAInputBoolean {
  /**
   * Friendly name of the boolean input.
   * Optional.
   */
  name: string;

  /**
   * Icon to display in front of the input element in the frontend.
   * Optional.
   */
  icon?: string;

  /**
   * Set the initial value of this input
   */
  initial?: boolean;
}

export type HAInputBooleanDictionary = {
  [id: string]: HAInputBoolean;
};
