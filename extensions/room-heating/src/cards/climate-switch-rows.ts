import {
  ClimateTarget,
  DEFAULT_SETPOINT_ATTRIBUTE,
  DEFAULT_TEMPERATURE_ATTRIBUTE,
} from "@hassforge/base";
import { EntityRowCard } from "@hassforge/types";

export function climateSwitchRow(climate: ClimateTarget): EntityRowCard {
  return {
    type: "custom:multiple-entity-row",
    entity: climate.id,
    icon: "mdi:fire",
    name: climate.name,
    toggle: true,
    state_header: "On/Off",
    entities: [
      {
        name: "Desired",
        attribute: climate.setpointAttribute ?? DEFAULT_SETPOINT_ATTRIBUTE,
      },
      {
        name: "Current",
        attribute:
          climate.temperatureAttribute ?? DEFAULT_TEMPERATURE_ATTRIBUTE,
      },
    ],
  };
}

export function climateSwitchRows(climates: ClimateTarget[]): EntityRowCard[] {
  return climates.map(climateSwitchRow);
}
