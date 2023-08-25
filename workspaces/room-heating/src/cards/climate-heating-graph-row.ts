import { DEFAULT_TEMPERATURE_ATTRIBUTE } from "@hassforge/base";
import { heatingColorThresholds, MiniGraphCard } from "@hassforge/types";
import { DesiredTemperatureTemplateSensor } from "..";

export function climateHeatingGraphRow(
  sensors: DesiredTemperatureTemplateSensor[]
) {
  return {
    type: "horizontal-stack",
    cards: sensors.map((desiredTemperatureTemplate): MiniGraphCard => {
      const climate = desiredTemperatureTemplate.parent;
      return {
        type: "custom:mini-graph-card",
        name: climate.name,
        line_width: 4,
        font_size: 75,
        points_per_hour: 15,
        color_thresholds: heatingColorThresholds,
        entities: [
          {
            entity: climate.id,
            attribute:
              climate.temperatureAttribute ?? DEFAULT_TEMPERATURE_ATTRIBUTE,
          },
          {
            entity: desiredTemperatureTemplate.id,
            color: "white",
            show_line: false,
            show_points: false,
            show_legend: false,
            y_axis: "secondary",
          },
        ],
        show: {
          labels: false,
        },
      };
    }),
  };
}
