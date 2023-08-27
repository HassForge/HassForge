export namespace HAButtonDeviceClass {
  /**
   * Generic button. This is the default and doesn’t need to be set.
   */
  export type None = "none";

  /**
   * The button is used to identify a device.
   */
  export type Identify = "identify";

  /**
   * The button restarts the device.
   */
  export type Restart = "restart";

  /**
   * The button updates the software of the device.
   */
  export type Update = "update";
}

/**
 * A union type of all the types inside the `HAButtonDeviceClass` namespace.
 */
export type HAButtonDeviceClass =
  | HAButtonDeviceClass.None
  | HAButtonDeviceClass.Identify
  | HAButtonDeviceClass.Restart
  | HAButtonDeviceClass.Update;
