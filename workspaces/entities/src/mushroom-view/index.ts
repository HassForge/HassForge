import { LightTarget, Room, SwitchTarget } from "@hassforge/base";
import {
  HABadge,
  HACard,
  HAView,
  HorizontalStackCard,
  VerticalStackCard,
} from "@hassforge/types";
import { MushroomEntityCard } from "./cards/mushroom-entity-card";
import { MushroomLightCard } from "./cards/mushroom-light-card";
import { MushroomTitleCard } from "./cards/mushroom-title-card";



function isDefined<T>(val: T | undefined | null): val is T {
  return val !== undefined && val !== null;
}

function toLightCard(light: LightTarget | SwitchTarget): MushroomLightCard {
  return {
    type: "custom:mushroom-light-card",
    entity: light.id,
    name: light.name,
  };
}

function toEntityCard(entity: SwitchTarget): MushroomEntityCard {
  return {
    type: "custom:mushroom-entity-card",
    entity: entity.id,
    name: entity.name,
  };
}

function roomToMushroom(room: Room): VerticalStackCard {
  const title: MushroomTitleCard = {
    type: "custom:mushroom-title-card",
    title: room.name,
  };

  const lights: HorizontalStackCard | undefined =
    room.lights.length > 0
      ? {
          type: "horizontal-stack",
          cards: room.lights
            .map(toLightCard)
            .map((card) => ({ ...card, layout: "vertical" })),
        }
      : undefined;

  const switches: HorizontalStackCard | undefined =
    room.switches.length > 0
      ? {
          type: "horizontal-stack",
          cards: room.switches
            .map(toEntityCard)
            .map((card) => ({ ...card, layout: "vertical" })),
        }
      : undefined;

  return {
    type: "vertical-stack",
    cards: [title, lights, switches].filter(isDefined),
  };
}

export class MushroomView implements HAView {
  title: string;
  panel?: boolean | undefined;
  visible?: boolean | { user: string }[] | undefined;
  theme?: string | undefined;
  subview?: boolean | undefined;
  back_path?: string | undefined;
  icon?: string | undefined;
  badges?:
    | (
        | `calendar.${string}`
        | `sensor.${string}`
        | `switch.${string}`
        | `light.${string}`
        | `climate.${string}`
        | `binary_sensor.${string}`
        | HABadge
      )[]
    | undefined;
  path?: string | undefined;

  // Rooms

  rooms: Room[] = [];

  constructor(title: string) {
    this.title = title;
  }

  addRooms(...rooms: Room[]) {
    this.rooms.push(...rooms);
    return this;
  }

  get cards(): HACard[] {
    return this.rooms.map(roomToMushroom);
  }
}
