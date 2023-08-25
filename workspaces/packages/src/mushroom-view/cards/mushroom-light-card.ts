import { EntityID } from "@hassbuilder/types";

export interface MushroomLightCard {
  type: 'custom:mushroom-light-card',
  entity: EntityID;
  icon?: string;
  icon_color?: string;
  name?: string;
  layout?: "vertical" | "horizontal" | "default";
  fill_container?: boolean;
  primary_info?: "name" | "state" | "last-changed" | "last-updated" | "none";
  secondary_info?: "name" | "state" | "last-changed" | "last-updated" | "none";
  icon_type?: "icon" | "entity-picture" | "none";
  show_brightness_control?: boolean;
  show_color_temp_control?: boolean;
  show_color_control?: boolean;
  collapsible_controls?: boolean;
  use_light_color?: boolean;
  tap_action?: "toggle" | "more-info";
  hold_action?: "toggle" | "more-info";
  double_tap_action?: "toggle" | "more-info";
}
