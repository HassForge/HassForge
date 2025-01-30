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
      id: climate.id,
      jinjaString: `{% set ${climate.id} = ${getTemperatureJinjaString(
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
        state: `{% set data = namespace(all_temps=[${climates.map((climate) =>
      getTemperatureJinjaString(
        climate.id,
        isClimateTarget(climate)
          ? climate.temperatureAttribute ?? DEFAULT_TEMPERATURE_ATTRIBUTE
          : undefined
      )
    )}]) %}
    {% set valid = data.all_temps | select('is_number') | map('float') | list %}
    {{ 'Unknown' if valid | count == 0 else (valid | sum / valid | count) }}`,
      },
      climates
    );
  }
}
