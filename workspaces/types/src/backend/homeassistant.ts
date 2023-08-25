import { DeviceClass } from "./device-class";

export type HACustomizeDictionary = { [key: string]: Customize };

export interface Customize {
  /**
   * Name of the entity as displayed in the UI.
   */
  friendly_name?: string;

  /**
   * URL to use as picture for entity.
   */
  entity_picture?: string;

  /**
   * Any icon from Material Design Icons. Prefix name with `mdi:`, ie
   * `mdi:home`. Note: Newer icons may not yet be available in the current Home
   * Assistant release.
   */
  icon?: string;

  /**
   * For switches with an assumed state two buttons are shown (turn off, turn on)
   * instead of a switch. By setting assumed_state to false you will get the
   * default switch icon.
   */
  assumed_state?: boolean;

  /**
   * Sets the class of the device, changing the device state and icon that is
   * displayed on the UI (see below). It does not set the `unit_of_measurement`.
   */
  device_class?: DeviceClass;

  /**
   * Defines the units of measurement, if any. This will also influence the
   * graphical presentation in the history visualization as continuous value.
   * Sensors with missing `unit_of_measurement` are showing as discrete values.
   */
  unit_of_measurement?: string;

  /**
   * Sets the initial state for automations, on or off.
   */
  initial_state?: boolean;
}

export interface HAHomeassistant {
  customize: HACustomizeDictionary;
}
