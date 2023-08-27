export namespace HASwitchDeviceClass {
  /**
   * Generic switch. This is the default and doesn’t need to be set.
   */
  export type None = "none";

  /**
   * This switch, switches a power outlet.
   */
  export type Outlet = "outlet";

  /**
   * A generic switch.
   */
  export type Switch = "switch";
}

export type HASwitchDeviceClass =
  | HASwitchDeviceClass.None
  | HASwitchDeviceClass.Outlet
  | HASwitchDeviceClass.Switch;
