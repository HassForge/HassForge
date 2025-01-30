import { snakeCase } from "change-case";
import {
  TemplateSensor,
  ClimateTarget,
  DEFAULT_TEMPERATURE_ATTRIBUTE,
  SensorTarget,
  isClimateTarget,
} from "@hassforge/base";

const getTemperatureJinjaString = (
  id: TemplateSensor["id"] | ClimateTarget["id"],
  temperatureAttribute?: string
) =>
  temperatureAttribute
    ? `state_attr('${id}', '${temperatureAttribute}')`
    : `states('${id}')`;

/**
 *
 * Example:
 *
 * ```
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
 * ```
 */
export class AverageTemperatureTemplateSensor extends TemplateSensor<
  (SensorTarget | ClimateTarget)[]
> {
  constructor(name: string, climates: (SensorTarget | ClimateTarget)[]) {
    const temperatureSets = climates.map((climate) => ({
      id: snakeCase(climate.name),
      jinjaString: `{% set ${snakeCase(
        climate.name
      )} = ${getTemperatureJinjaString(
        climate.id,
        isClimateTarget(climate)
          ? climate.temperatureAttribute ?? DEFAULT_TEMPERATURE_ATTRIBUTE
          : undefined
      )} %}`,
    }));
    super(
      {
        name: `Average ${name} temperature`,
        unit_of_measurement: "°C",
        state: `
    ${temperatureSets.map((set) => set.jinjaString).join("\n    ")} 
    {% set data = namespace(valid_temps=[]) %}
    {% for temp in [${temperatureSets.map((set) => set.id).join(", ")}] %}
      {% if is_number(temp) %}
        {% set data.valid_temps = data.valid_temps + [temp | float] %}
      {% endif %}
    {% endfor %}
    {% if data.valid_temps | length > 0 %}
      {{ (data.valid_temps | sum) / (data.valid_temps | length) | round(1, default=0) }}
    {% else %}
      Unknown
    {% endif %}
`,
      },
      climates
    );
  }
}
