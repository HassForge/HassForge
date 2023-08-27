export namespace HACoverDeviceClass {
  /**
   * Generic cover. This is the default and doesn’t need to be set.
   */
  export type None = "none";

  /**
   * Control of an awning, such as an exterior retractable window, door, or patio cover.
   */
  export type Awning = "awning";

  /**
   * Control of blinds, which are linked slats that expand or collapse to cover an opening or may be tilted to partially covering an opening, such as window blinds.
   */
  export type Blind = "blind";

  /**
   * Control of curtains or drapes, which is often fabric hung above a window or door that can be drawn open.
   */
  export type Curtain = "curtain";

  /**
   * Control of a mechanical damper that reduces airflow, sound, or light.
   */
  export type Damper = "damper";

  /**
   * Control of a door or gate that provides access to an area.
   */
  export type Door = "door";

  /**
   * Control of a garage door that provides access to a garage.
   */
  export type Garage = "garage";

  /**
   * Control of a gate. Gates are found outside of a structure and are typically part of a fence.
   */
  export type Gate = "gate";

  /**
   * Control of shades, which are a continuous plane of material or connected cells that expanded or collapsed over an opening, such as window shades.
   */
  export type Shade = "shade";

  /**
   * Control of shutters, which are linked slats that swing out/in to covering an opening or may be tilted to partially cover an opening, such as indoor or exterior window shutters.
   */
  export type Shutter = "shutter";

  /**
   * Control of a physical window that opens and closes or may tilt.
   */
  export type Window = "window";
}

/**
 * A union type of all the types inside the `HACoverDeviceClass` namespace.
 */
export type HACoverDeviceClass =
  | HACoverDeviceClass.None
  | HACoverDeviceClass.Awning
  | HACoverDeviceClass.Blind
  | HACoverDeviceClass.Curtain
  | HACoverDeviceClass.Damper
  | HACoverDeviceClass.Door
  | HACoverDeviceClass.Garage
  | HACoverDeviceClass.Gate
  | HACoverDeviceClass.Shade
  | HACoverDeviceClass.Shutter
  | HACoverDeviceClass.Window;
