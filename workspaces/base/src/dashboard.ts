import { EntityID, HABadge, HACard } from "@hassforge/types";

export class Dashboard {
  title: string;
  visible?: boolean | { user: string }[];
  cards: HACard[] = [];
  theme?: string;
  subview?: boolean;
  back_path?: string;
  icon?: string;
  badges?: (EntityID | HABadge)[];
  path?: string;

  constructor(title: string) {
    this.title = title;
  }

  addCard(...card: HACard[]) {
    this.cards.push(...card);
    return this;
  }

  addCards(cards: HACard[]) {
    this.cards.push(...cards);
    return this;
  }

  addBadges(...badges: (EntityID | HABadge)[]) {
    (this.badges ??= []).push(...badges);
    return this;
  }
}
