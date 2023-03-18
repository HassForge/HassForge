import { SchedulerCard, SchedulerCardCustomize } from "@hassbuilder/types";
import { ClimateTarget } from "./configuration";

export class SchedulerBuilder {
  climates: { room: string; climate: ClimateTarget }[] = [];

  addRoomClimate(...targets: { room: string; climate: ClimateTarget }[]) {
    this.climates = [...this.climates, ...targets];
    return this;
  }

  buildFrontend(): SchedulerCard {
    return {
      type: "custom:scheduler-card",
      include: this.climates.map(({ climate }) => climate.id),
      customize: this.climates.reduce<SchedulerCardCustomize>(
        (prev, curr) => ({
          ...prev,
          [curr.climate.id]: {
            exclude_actions: ["auto"],
          },
        }),
        {}
      ),
    };
  }
}
