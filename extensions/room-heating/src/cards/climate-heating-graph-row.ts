import {
  ClimateTarget,
  DEFAULT_TEMPERATURE_ATTRIBUTE,
  SensorTarget,
  isClimateTarget,
} from "@hassforge/base";
import { heatingColorThresholds, MiniGraphCard } from "@hassforge/types";

export function climateHeatingGraphRow(
  sensors: (SensorTarget | ClimateTarget)[]
) {
  return {
    type: "horizontal-stack",
    cards: sensors.map((sensor): MiniGraphCard => {
      return {
        type: "custom:mini-graph-card",
        name: sensor.name!,
        line_width: 4,
        font_size: 75,
        points_per_hour: 15,
        color_thresholds: heatingColorThresholds,
        entities: [
          {
            entity: sensor.id,
            attribute: isClimateTarget(sensor)
              ? sensor.temperatureAttribute ?? DEFAULT_TEMPERATURE_ATTRIBUTE
              : undefined,
          },
          ...(isClimateTarget(sensor)
            ? [
                {
                  entity: sensor.id,
                  color: "white",
                  show_line: false,
                  show_points: false,
                  show_legend: false,
                  y_axis: "secondary",
                },
              ]
            : []),
        ],
        show: {
          labels: false,
        },
      };
    }),
  };
}
