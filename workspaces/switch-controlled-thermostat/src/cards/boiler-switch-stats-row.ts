import { EntityRowCard } from "@hassforge/types";
import {
  BoilerBurningTemplateSensorOptions,
  BoilerBurningTimeSensor,
  TotalRadiatorsHeatRequestedSensor,
} from "../entities";

export function boilerSwitchStatsRow({
  boilerOptions,
  burningTimeSensor,
  totalRadiatorsHeatRequestedSensor,
}: {
  boilerOptions: BoilerBurningTemplateSensorOptions;
  burningTimeSensor: BoilerBurningTimeSensor;
  totalRadiatorsHeatRequestedSensor: TotalRadiatorsHeatRequestedSensor;
}): EntityRowCard {
  return {
    type: "custom:multiple-entity-row",
    entity: boilerOptions.haSwitch.id,
    toggle: true,
    entities: [
      {
        entity: burningTimeSensor.id,
        name: "24h On Time",
      },
      {
        entity: totalRadiatorsHeatRequestedSensor.id,
        name: "Rad Heat Needed",
      },
    ],
    icon: "mdi:fire",
    name: "Boiler",
  };
}
