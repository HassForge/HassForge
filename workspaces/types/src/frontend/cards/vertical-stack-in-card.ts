import { HACard } from "../card";

export interface VerticalStackInCard extends HACard {
    type: "custom:vertical-stack-in-card";
    title: string;
    cards: HACard[];
  }