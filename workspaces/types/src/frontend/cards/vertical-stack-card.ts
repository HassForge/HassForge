import { HACard } from "../card";

export interface VerticalStackCard extends HACard {
    type: "custom:vertical-stack-in-card";
    title: string;
    cards: HACard[];
  }