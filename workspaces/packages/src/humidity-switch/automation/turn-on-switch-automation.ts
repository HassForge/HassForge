import { Automation, SensorTarget, SwitchTarget } from "@hassbuilder/base";
import { snakeCase } from "change-case";

export class TurnOnSwitchBinarySensorAutomation extends Automation {
  constructor(
    name: string,
    sensorTarget: SensorTarget,
    switchTarget: SwitchTarget,
    description?: string
  ) {
    super({
      alias: name,
      id: snakeCase(name),
      description,
      trigger: [
        {
          platform: "state",
          entity_id: sensorTarget.id,
          from: "off",
          to: "on",
        },
      ],

      action: [
        {
          service: "switch.turn_on",
          target: {
            entity_id: switchTarget.id,
          },
        },
      ],
    });
  }
}
