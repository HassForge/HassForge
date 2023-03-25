import { SchedulerCard, SchedulerCardCustomize } from "@hassbuilder/types";
import { ClimateTarget } from "@hassbuilder/base/src/configuration";

interface Room {
  name: string;
  climates: ClimateTarget[];
}

export class SchedulerBuilder {
  rooms: Room[] = [];

  addRoom(...targets: Room[]) {
    this.rooms = [...this.rooms, ...targets];
    return this;
  }

  card(): SchedulerCard {
    const climateIds = this.rooms.flatMap(({ climates }) =>
      climates.map((climate) => climate.id)
    );
    return {
      type: "custom:scheduler-card",
      include: climateIds,
      customize: climateIds.reduce<SchedulerCardCustomize>(
        (prev, climateId) => ({
          ...prev,
          [climateId]: {
            exclude_actions: ["auto"],
          },
        }),
        {}
      ),
    };
  }
}
