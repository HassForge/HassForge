import { EntityID } from "../id";

export interface HABadge {
  entity: EntityID;
  name?: string;
  icon?: string;
  image?: string;
  show_name?: string;
  show_icon?: string;
}
