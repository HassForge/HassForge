import {
  Dashboard,
  LightTarget,
  MediaPlayerTarget,
  Room,
  SwitchTarget,
} from "@hassforge/base";
import {
  HACard,
  HorizontalStackCard,
  VerticalStackCard,
} from "@hassforge/types";
import { MushroomEntityCard } from "./cards/mushroom-entity-card";
import { MushroomLightCard } from "./cards/mushroom-light-card";
import { MushroomTitleCard } from "./cards/mushroom-title-card";
import { WithRoomHeating } from "@hassforge/room-heating";
import { MushroomChip } from "./cards/mushroom-chips-card";
import { MushroomMediaPlayerCard } from "./cards/mushroom-media-player-card";

function isDefined<T>(val: T | undefined | null): val is T {
  return val !== undefined && val !== null;
}

function toLightCard(light: LightTarget | SwitchTarget): MushroomLightCard {
  return {
    type: "custom:mushroom-light-card",
    entity: light.id,
    name: light.name,
    show_brightness_control: (light as LightTarget).dimmable,
    show_color_control: (light as LightTarget).rgb,
    icon: light.icon ?? "mdi:lightbulb",
  };
}

function toEntityCard(entity: SwitchTarget): MushroomEntityCard {
  return {
    type: "custom:mushroom-entity-card",
    entity: entity.id,
    name: entity.name,
  };
}

function toMediaPlayerCard(entity: MediaPlayerTarget): MushroomMediaPlayerCard {
  return {
    type: "custom:mushroom-media-player-card",
    entity: entity.id,
    name: entity.name,
  };
}

export function roomToMushroom(
  room: Room,
  extras?: { chips?: MushroomChip[]; preCards?: HACard[]; postCards?: HACard[] }
) {
  const title: MushroomTitleCard = {
    type: "custom:mushroom-title-card",
    title: room.name,
  };

  const chips: MushroomChip[] = [];

  if (room.hasExtension(WithRoomHeating) && room.climates.length > 0) {
    chips.push({
      type: "entity",
      entity: room.extensions.roomHeating.averageTemperatureSensor.id,
      icon: "mdi:thermometer",
    });
  }

  if (room.cameras.length > 0) {
    room.cameras.forEach((camera) => {
      chips.push({
        type: "entity",
        entity: camera.id,
        icon: "mdi:camera",
      });
    });
  }

  chips.push(...(extras?.chips ?? []));

  const chipCard =
    chips.length > 0
      ? {
          type: "custom:mushroom-chips-card",
          chips,
        }
      : undefined;

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

  const mediaPlayers = room.mediaPlayers.map(toMediaPlayerCard);

  return {
    type: "vertical-stack",
    cards: [
      title,
      chipCard,
      ...(extras?.preCards ?? []),
      lights,
      switches,
      ...mediaPlayers,
      ...(extras?.postCards ?? []),
    ].filter(isDefined),
  } as const satisfies VerticalStackCard;
}

export class MushroomDashboard extends Dashboard {
  // Rooms

  addRooms(...rooms: Room[]) {
    this.cards.push(
      ...rooms
        .map((room) =>
          roomToMushroom(room, {
            preCards: room.preCards,
            postCards: room.postCards,
          })
        )
        .filter((stack) => stack.cards.length > 1)
    );
    return this;
  }
}
