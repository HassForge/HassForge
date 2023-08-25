import {
  heatingColorThresholds,
  MiniGraphCardEntity,
} from "@hassforge/types";
import { RoomHeating } from "../extension";

export const averageTemperatureGraph = ({
  averageTemperatureSensor,
  desiredTemperatureSensors,
}: RoomHeating) => {
  return {
    type: "custom:mini-graph-card",
    name: averageTemperatureSensor.name,
    show: {
      labels: false,
    },
    line_width: 2,
    font_size: 75,
    points_per_hour: 20,
    color_thresholds: heatingColorThresholds,
    entities: [
      averageTemperatureSensor.id,
      ...desiredTemperatureSensors.map(
        ({ parent }): MiniGraphCardEntity => ({
          entity: parent.id,
          color: "#ffffff44",
          show_line: false,
          show_points: false,
          show_legend: false,
          y_axis: "secondary",
        })
      ),
    ],
  };
};
