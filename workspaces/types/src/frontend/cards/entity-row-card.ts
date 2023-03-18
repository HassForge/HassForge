import { EntityID } from "../../id";
import { HACard } from "../card";

export interface EntityRowCardEntity {
  entity?: string;
  attribute?: string;
  name: string;
}

export interface EntityRowCard extends HACard {
  type: "custom:multiple-entity-row";
  entity: string;
  icon: string;
  name: string;
  toggle: boolean;
  state_header?: string;
  entities: EntityRowCardEntity[];
  secondary_info?:
    | string
    | {
        entity: EntityID;
        attribute?: string;
        name?: string;
        unit?: string;
        hide_unavailable?: boolean;
        hide_if?: { above?: number; below?: number; value?: string[] | string };
        format:
          | "relative"
          | "total"
          | "date"
          | "datetime"
          | "brightness"
          | "duration"
          | "duration-m"
          | "invert"
          | "kilo"
          | "position"
          | `precision-${NumberRange<0, 9>}`;
      };
}
