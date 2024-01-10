import { MediaPlayerID } from "@hassforge/types";

/**
 * Configuration variables for the Media Player card.
 */
export interface MushroomMediaPlayerCard {
  
  type: "custom:mushroom-media-player-card"
    /**
   * Media Player entity.
   */
  entity: MediaPlayerID; // Required

  /**
   * Custom icon for the card.
   */
  icon?: string; // Optional

  /**
   * Custom name for the card.
   */
  name?: string; // Optional

  /**
   * Layout of the card. Vertical, horizontal, and default layout are supported.
   */
  layout?: string; // Optional

  /**
   * Fill container or not. Useful when the card is in a grid, vertical, or horizontal layout.
   */
  fill_container?: boolean; // Default: false

  /**
   * Info to show as primary info. Possible values: name, state, last-changed, last-updated, none.
   */
  primary_info?: "name" | "state" | "last-changed" | "last-updated" | "none"; // Default: name

  /**
   * Info to show as secondary info. Possible values: name, state, last-changed, last-updated, none.
   */
  secondary_info?: "name" | "state" | "last-changed" | "last-updated" | "none"; // Default: state

  /**
   * Type of icon to display.
   */
  icon_type?: "icon" | "entity-picture" | "none"; // Default: icon

  /**
   * Use media info instead of name, state, and icon when media is playing.
   */
  use_media_info?: boolean; // Default: false

  /**
   * Show volume level next to media state when media is playing.
   */
  show_volume_level?: boolean; // Default: false

  /**
   * List of controls to display when media is playing.
   * Possible values: on_off, shuffle, previous, play_pause_stop, next, repeat.
   */
  media_controls?: string[]; // Default: []

  /**
   * List of controls to display for volume.
   * Possible values: volume_mute, volume_set, volume_buttons.
   */
  volume_controls?: string[]; // Default: []

  /**
   * Collapse controls when off.
   */
  collapsible_controls?: boolean; // Default: false

  /**
   * Home Assistant action to perform on tap.
   */
  tap_action?: string; // Default: more-info

  /**
   * Home Assistant action to perform on hold.
   */
  hold_action?: string; // Default: more-info

  /**
   * Home Assistant action to perform on double tap.
   */
  double_tap_action?: string; // Default: more-info
}
