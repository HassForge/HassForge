import { HACard } from "../card";

export interface HorizontalStackCard extends HACard {
  type: "horizontal-stack";
  cards: HACard[];
}
