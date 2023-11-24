import { EntityID } from "@hassforge/types";

export interface MushroomEntityChip {
  type: 'entity';
  entity: EntityID;
  icon?: string;
}

export interface MushroomTemplateChip {
  type: 'template';
  template: string;
  icon?: string;
}

export type MushroomChip = MushroomEntityChip | MushroomTemplateChip;

export interface MushroomChipsCard {
  type: "custom:mushroom-chips-card";
  chips: MushroomChip[];
}
