import { HACard } from "../card";

export interface VerticalStackCard extends HACard {
  type: "vertical-stack";
  cards: HACard[];
}
