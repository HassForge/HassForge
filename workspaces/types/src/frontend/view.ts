import { EntityID } from "../id";
import { HABadge } from "./badge";
import { HACard } from "./card";

export interface HAView {
  title: string;
  visible?: boolean | { user: string }[];
  cards: HACard[];
  theme?: string;
  subview?: boolean;
  back_path?: string;
  icon?: string;
  badges?: (EntityID | HABadge)[];
  path?: string;
}

export class View implements HAView {
  title: string;
  visible?: boolean | { user: string }[];
  cards: HACard[] = [];
  theme?: string;
  subview?: boolean;
  back_path?: string;
  icon?: string;
  badges?: (
    | `sensor.${string}`
    | `switch.${string}`
    | `light.${string}`
    | `climate.${string}`
    | HABadge
  )[];
  path?: string;

  constructor(title: string) {
    this.title = title;
  }
}
