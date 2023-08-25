import { EntityRowCard } from "@hassforge/types";
import { SwitchBasedThermostat } from "../extension";

export const boilerSwitchStatsRow = ({
  boilerOptions,
  burningTimeSensor,
  totalRadiatorsHeatRequestedSensor,
}: SwitchBasedThermostat): EntityRowCard => {
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
};
