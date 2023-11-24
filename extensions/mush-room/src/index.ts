import { Dashboard, LightTarget, Room, SwitchTarget } from "@hassforge/base";
import { HorizontalStackCard, VerticalStackCard } from "@hassforge/types";
import { MushroomEntityCard } from "./cards/mushroom-entity-card";
import { MushroomLightCard } from "./cards/mushroom-light-card";
import { MushroomTitleCard } from "./cards/mushroom-title-card";
import { WithRoomHeating } from "@hassforge/room-heating";
import { MushroomChip } from "./cards/mushroom-chips-card";

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

function roomToMushroom(room: Room): VerticalStackCard {
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

  return {
    type: "vertical-stack",
    cards: [title, chipCard, lights, switches].filter(isDefined),
  };
}

export class MushroomDashboard extends Dashboard {
  // Rooms

  addRooms(...rooms: Room[]) {
    this.cards.push(
      ...rooms.map(roomToMushroom).filter((stack) => stack.cards.length > 1)
    );
    return this;
  }
}
