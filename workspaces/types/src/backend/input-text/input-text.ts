/**
 * HAInputText represents the structure of a text input configuration.
 * Multiple entries are allowed.
 */
export interface HAInputText {
  /**
   * Friendly name of the text input.
   * Optional.
   */
  name?: string;

  /**
   * Minimum length for the text value.
   * Optional, default: 0.
   */
  min?: number;

  /**
   * Maximum length for the text value.
   * Optional, default: 100.
   * Maximum allowed is 255 characters (entity state limit).
   */
  max?: number;

  /**
   * Initial value when Home Assistant starts.
   * Optional.
   */
  initial?: string;

  /**
   * Icon to display in front of the input element in the frontend.
   * Optional.
   */
  icon?: string;

  /**
   * Regex pattern for client-side validation.
   * Optional, default: empty.
   */
  pattern?: string;

  /**
   * Input mode, can be 'text' or 'password'.
   * Elements of type "password" provide a way for the user to securely enter a value.
   * Optional, default: 'text'.
   */
  mode?: 'text' | 'password';
}

export type HAInputTextDictionary = {
  [id: string]: HAInputText;
};
