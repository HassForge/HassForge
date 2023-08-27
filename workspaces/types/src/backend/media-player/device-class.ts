export namespace HAMediaPlayerDeviceClass {
  /**
   * Device is a television type device.
   */
  export type TV = "tv";

  /**
   * Device is a speaker or stereo type device.
   */
  export type Speaker = "speaker";

  /**
   * Device is an audio video receiver type device taking audio and outputting to speakers and video to some display.
   */
  export type Receiver = "receiver";
}

/**
 * A union type of all the types inside the `HAMediaPlayerDeviceClass` namespace.
 */
export type HAMediaPlayerDeviceClass =
  | HAMediaPlayerDeviceClass.TV
  | HAMediaPlayerDeviceClass.Speaker
  | HAMediaPlayerDeviceClass.Receiver;
