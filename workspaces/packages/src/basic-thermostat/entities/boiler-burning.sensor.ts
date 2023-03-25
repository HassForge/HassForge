import { TemplateSensor, SwitchTarget, SensorTarget } from "@hassbuilder/base";

export interface BoilerBurningTemplateSensorOptions {
  haSwitch: SwitchTarget;
  powerConsumptionSensor: SensorTarget;
  powerConsumptionStandbyRange: [number, number];
}

export class BoilerBurningTemplateSensor extends TemplateSensor {
  constructor({
    haSwitch,
    powerConsumptionSensor,
    powerConsumptionStandbyRange,
  }: BoilerBurningTemplateSensorOptions) {
    super({
      name: "Boiler Burning State",
      state: `
              {% if is_state('${haSwitch.id}', 'off') %}
                off
              {% elif states('${powerConsumptionSensor.id}') | float < ${powerConsumptionStandbyRange[0]} %}
                standby
              {% elif states('${powerConsumptionSensor.id}') | float > ${powerConsumptionStandbyRange[1]} %}
                on
              {% else %}
                failed
              {% endif %}`,
    });
  }
}
