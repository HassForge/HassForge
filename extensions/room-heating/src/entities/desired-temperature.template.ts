import { capitalCase } from "change-case";
import {
  TemplateSensor,
  ClimateTarget,
  DEFAULT_SETPOINT_ATTRIBUTE,
  DEFAULT_HEAT_MODE_ATTRIBUTE,
} from "@hassforge/base";

/**
 * Example:
 * ```
 *   - sensor:
 *     - name: "Desired Main Bedroom Temperature"
 *       unique_id: "desired_main_bedroom_temperature"
 *       unit_of_measurement: "°C"
 *       state: >
 *         {% set rad = state_attr('climate.0xa4c138a26993e5e1', 'current_heating_setpoint') | float %}
 *         {% set heatMode = state_attr('climate.0xa4c138a26993e5e1', 'system_mode') %}
 *         {% if heatMode == "off" %}
 *           0
 *         {% else %}
 *          {{ ((rad) / 1) | round(1, default=0) }}
 *         {% endif %}
 * ```
 */
export class DesiredTemperatureTemplateSensor extends TemplateSensor<ClimateTarget> {
  constructor(target: ClimateTarget, nameOverride?: string) {
    const {
      name,
      id,
      setpointAttribute = DEFAULT_SETPOINT_ATTRIBUTE,
      heatModeAttribute = DEFAULT_HEAT_MODE_ATTRIBUTE,
    } = target;

    super(
      {
        name: `Desired ${capitalCase(nameOverride ?? name)} Temperature`,
        unit_of_measurement: "°C",
        state: `
            {% if state_attr('${id}', '${heatModeAttribute}') == "off" %}
                0
            {% else %}
                {{ state_attr('${id}', '${setpointAttribute}') | float }}
            {% endif %}`,
      },
      target
    );
  }
}
