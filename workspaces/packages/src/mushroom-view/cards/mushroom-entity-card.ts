import { EntityID } from "@hassbuilder/types";

export interface MushroomEntityCard {
  type: "custom:mushroom-entity-card";
  entity: EntityID;
  icon?: string;
  icon_color?: string;
  name?: string;
  layout?: "vertical" | "horizontal" | "default";
  fill_container?: boolean;
  primary_info?: "name" | "state" | "last-changed" | "last-updated" | "none";
  secondary_info?: "name" | "state" | "last-changed" | "last-updated" | "none";
  icon_type?: "icon" | "entity-picture" | "none";
  tap_action?: "toggle" | "more-info";
  hold_action?: "toggle" | "more-info";
  double_tap_action?: "toggle" | "more-info";
}
