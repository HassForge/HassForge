import {
  Action,
  Automation,
  BinarySensorTarget,
  SwitchTarget,
  Trigger,
} from "@hassforge/base";
import { snakeCase } from "change-case";

export class TurnOnSwitchBinarySensorAutomation extends Automation {
  constructor(
    name: string,
    sensorTarget: BinarySensorTarget,
    switchTarget: SwitchTarget,
    description?: string
  ) {
    super({
      alias: name,
      id: snakeCase(name),
      description,
      trigger: [Trigger.state(sensorTarget.id, { to: "on" })],

      action: [Action.turnOn(switchTarget.id)],
    });
  }
}
