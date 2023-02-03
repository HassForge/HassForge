import { capitalCase, snakeCase } from "change-case";
import { ClimateTarget } from "../types/climate";
import { SensorID } from "../types/sensor";
import { TemplateSensor } from "../types/template";


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
export const generateAverageTemperatureTemplateSensor = (
  areaName: string,
  climates: ClimateTarget[]
): [SensorID, TemplateSensor] => {
  const temperatureSets = climates.map((climate) => ({
    id: snakeCase(climate.name),
    jinjaString: `{% set ${snakeCase(climate.name)} = state_attr('${
      climate.climateId
    }', '${climate.temperatureAttribute}') | float %}`,
  }));
  return [
    `sensor.average_${snakeCase(areaName)}_temperature`,
    {
      name: `Average ${capitalCase(areaName)} Temperature`,
      unique_id: `average_${snakeCase(areaName)}_temperature`,
      unit_of_measurement: "°C",
      state: `
      ${temperatureSets.map((set) => set.jinjaString).join("\n    ")} 
      {{ ((${temperatureSets.map((set) => set.id).join(" + ")}) / ${
        temperatureSets.length
      }) | round(1, default=0) }}
`,
    },
  ];
};

/**
 * Example:
 *
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
 */
export const generateDesiredTemperatureTemplateSensor = (
  roomName: string,
  { name, climateId, setpointAttribute, temperatureAttribute }: ClimateTarget
): [SensorID, TemplateSensor] => [
  `sensor.desired_${snakeCase(roomName)}_${snakeCase(name)}_temperature`,
  {
    name: `Desired ${capitalCase(roomName)} ${capitalCase(name)} Temperature`,
    unique_id: `desired_${snakeCase(roomName)}_${snakeCase(name)}_temperature`,
    unit_of_measurement: "°C",
    state: `    {% if state_attr('${climateId}', '${setpointAttribute}') == "off" %}
              0
          {% else %}
              state_attr('${climateId}', '${temperatureAttribute}') | float
          {% endif %}
`,
  },
];
