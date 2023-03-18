import { snakeCase } from "change-case";
import { TemplateSensor, ClimateTarget } from "@hassbuilder/base";

const getTemperatureJinjaString = (
  id: TemplateSensor["id"] | ClimateTarget["id"],
  temperatureAttribute?: string
) =>
  temperatureAttribute
    ? `state_attr('${id}', '${temperatureAttribute}') | float`
    : `states('${id}') | float`;

/**
 *
 * Example:
 *
 * - sensor:
 *    - name: "Average Lounge Temperature"
 *       unique_id: "current_lounge_temperature"
 *       unit_of_measurement: "°C"
 *       state: >
 *         {% set near_kitchen = state_attr('climate.0xa4c138cbb0075703', 'local_temperature') | float %}
 *         {% set near_windows = state_attr('climate.0xa4c1380f35e39620', 'local_temperature') | float %}
 *         {% set toms_corner = state_attr('climate.0xa4c138bb1f4f3ae4', 'local_temperature') | float %}
 *         {{ ((near_kitchen + near_windows + toms_corner) / 3) | round(1, default=0) }}
 *
 */

export class AverageTemperatureTemplateSensor extends TemplateSensor<
  ClimateTarget[]
> {
  constructor(name: string, climates: ClimateTarget[]) {
    const temperatureSets = climates.map((climate) => ({
      id: snakeCase(climate.name),
      jinjaString: `{% set ${snakeCase(
        climate.name
      )} = ${getTemperatureJinjaString(
        climate.id,
        climate.temperatureAttribute
      )} %}`,
    }));
    super(
      {
        name: `Average ${name} temperature`,
        state: `
    ${temperatureSets.map((set) => set.jinjaString).join("\n    ")} 
    {{ ((${temperatureSets.map((set) => set.id).join(" + ")}) / ${
          temperatureSets.length
        }) | round(1, default=0) }}
`,
      },
      climates
    );
  }
}
