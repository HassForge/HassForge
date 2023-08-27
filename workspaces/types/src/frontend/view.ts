import { EntityID } from "../id";
import { HABadge } from "./badge";
import { HACard } from "./card";

export interface HAView {
  title: string;
  panel?: boolean
  visible?: boolean | { user: string }[];
  cards: HACard[];
  theme?: string;
  subview?: boolean;
  back_path?: string;
  icon?: string;
  badges?: (EntityID | HABadge)[];
  path?: string;
}

