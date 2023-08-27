export namespace HABinarySensorDeviceClass {
  /**
   * Generic on/off. This is the default and doesn’t need to be set.
   */
  export type None = "None";

  /**
   * On means low, off means normal.
   */
  export type Battery = "battery";

  /**
   * On means charging, off means not charging.
   */
  export type BatteryCharging = "battery_charging";

  /**
   * On means carbon monoxide detected, off means no carbon monoxide (clear).
   */
  export type CarbonMonoxide = "carbon_monoxide";

  /**
   * On means cold, off means normal.
   */
  export type Cold = "cold";

  /**
   * On means connected, off means disconnected.
   */
  export type Connectivity = "connectivity";

  /**
   * On means open, off means closed.
   */
  export type Door = "door";

  /**
   * On means open, off means closed.
   */
  export type GarageDoor = "garage_door";

  /**
   * On means gas detected, off means no gas (clear).
   */
  export type Gas = "gas";

  /**
   * On means hot, off means normal.
   */
  export type Heat = "heat";

  /**
   * On means light detected, off means no light.
   */
  export type Light = "light";

  /**
   * On means open (unlocked), off means closed (locked).
   */
  export type Lock = "lock";

  /**
   * On means moisture detected (wet), off means no moisture (dry).
   */
  export type Moisture = "moisture";

  /**
   * On means motion detected, off means no motion (clear).
   */
  export type Motion = "motion";

  /**
   * On means moving, off means not moving (stopped).
   */
  export type Moving = "moving";

  /**
   * On means occupied (detected), off means not occupied (clear).
   */
  export type Occupancy = "occupancy";

  /**
   * On means open, off means closed.
   */
  export type Opening = "opening";

  /**
   * On means device is plugged in, off means device is unplugged.
   */
  export type Plug = "plug";

  /**
   * On means power detected, off means no power.
   */
  export type Power = "power";

  /**
   * On means home, off means away.
   */
  export type Presence = "presence";

  /**
   * On means problem detected, off means no problem (OK).
   */
  export type Problem = "problem";

  /**
   * On means running, off means not running.
   */
  export type Running = "running";

  /**
   * On means unsafe, off means safe.
   */
  export type Safety = "safety";

  /**
   * On means smoke detected, off means no smoke (clear).
   */
  export type Smoke = "smoke";

  /**
   * On means sound detected, off means no sound (clear).
   */
  export type Sound = "sound";

  /**
   * On means tampering detected, off means no tampering (clear).
   */
  export type Tamper = "tamper";

  /**
   * On means update available, off means up-to-date.
   */
  export type Update = "update";

  /**
   * On means vibration detected, off means no vibration (clear).
   */
  export type Vibration = "vibration";

  /**
   * On means open, off means closed.
   */
  export type Window = "window";
}

export type HABinarySensorDeviceClass =
  | HABinarySensorDeviceClass.None
  | HABinarySensorDeviceClass.Battery
  | HABinarySensorDeviceClass.BatteryCharging
  | HABinarySensorDeviceClass.CarbonMonoxide
  | HABinarySensorDeviceClass.Cold
  | HABinarySensorDeviceClass.Connectivity
  | HABinarySensorDeviceClass.Door
  | HABinarySensorDeviceClass.GarageDoor
  | HABinarySensorDeviceClass.Gas
  | HABinarySensorDeviceClass.Heat
  | HABinarySensorDeviceClass.Light
  | HABinarySensorDeviceClass.Lock
  | HABinarySensorDeviceClass.Moisture
  | HABinarySensorDeviceClass.Motion
  | HABinarySensorDeviceClass.Moving
  | HABinarySensorDeviceClass.Occupancy
  | HABinarySensorDeviceClass.Opening
  | HABinarySensorDeviceClass.Plug
  | HABinarySensorDeviceClass.Power
  | HABinarySensorDeviceClass.Presence
  | HABinarySensorDeviceClass.Problem
  | HABinarySensorDeviceClass.Running
  | HABinarySensorDeviceClass.Safety
  | HABinarySensorDeviceClass.Smoke
  | HABinarySensorDeviceClass.Sound
  | HABinarySensorDeviceClass.Tamper
  | HABinarySensorDeviceClass.Update
  | HABinarySensorDeviceClass.Vibration
  | HABinarySensorDeviceClass.Window;
