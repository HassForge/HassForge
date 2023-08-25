import {
  ClimateTarget,
  DEFAULT_SETPOINT_ATTRIBUTE,
  DEFAULT_TEMPERATURE_ATTRIBUTE,
  Room,
} from "@hassforge/base";
import { EntityRowCard } from "@hassforge/types";
import { RoomHeating } from "../extension";

export const climateSwitchCard = (climate: ClimateTarget): EntityRowCard => ({
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
      attribute: climate.temperatureAttribute ?? DEFAULT_TEMPERATURE_ATTRIBUTE,
    },
  ],
});

export const climateSwitchCards = ({
  climates,
}: Room & RoomHeating): EntityRowCard[] => {
  return climates.map(climateSwitchCard);
};
