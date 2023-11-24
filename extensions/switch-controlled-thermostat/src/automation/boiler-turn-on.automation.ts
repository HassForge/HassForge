import {
  Action,
  Automation,
  Condition,
  SensorTarget,
  SwitchTarget,
  Trigger,
  statesNotationTransform,
} from "@hassforge/base";
import { snakeCase } from "change-case";

export class BoilerTurnOnAutomation extends Automation {
  constructor(
    radiatorHeatNeededSensor: SensorTarget,
    boilerSwitch: SwitchTarget
  ) {
    const alias = "Turn on boiler when heat needed";
    super({
      alias,
      id: snakeCase(alias),
      trigger: [
        Trigger.state(radiatorHeatNeededSensor.id),
        Trigger.timePattern({ minutes: "/15" }),
      ],
      condition: [
        Condition.template(
          `{{ states('${radiatorHeatNeededSensor.id}') | float > 0 }}`
        ),
        Condition.template(`{% set changed = as_timestamp(${statesNotationTransform(
          boilerSwitch.id
        )}.last_changed) %}
  {% set now = as_timestamp(now()) %}
  {% set time = now - changed %}
  {% set minutes = (time / 60) | int %}
  {{ minutes > 5 }}`),
      ],
      action: [Action.turnOn(boilerSwitch.id)],
    });
  }
}
