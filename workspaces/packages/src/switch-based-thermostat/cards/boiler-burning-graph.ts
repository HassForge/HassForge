import { MiniGraphCard } from "@hassbuilder/types";
import { SwitchBasedThermostat } from "../extension";

export const boilerBurningGraph = ({ isBurningSensor }: SwitchBasedThermostat): MiniGraphCard => {
  return {
    type: "custom:mini-graph-card",
    name: "On Time",
    entities: [isBurningSensor.id],
    line_width: 2,
    font_size: 75,
    smoothing: false,
    hours_to_show: 3,
    points_per_hour: 60,
    color_thresholds: [
      { color: "#0e7490", value: "off" },
      { color: "#64748b", value: "standby" },
      { color: "#ea580c", value: "on" },
    ],
    color_thresholds_transition: "hard",
    state_map: [
      { value: "off", label: "Off" },
      { value: "standby", label: "Standby" },
      { value: "on", label: "On" },
    ],
  };
};
