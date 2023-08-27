import {
  Action,
  Automation,
  BinarySensorTarget,
  SensorTarget,
  SwitchTarget,
  Trigger,
} from "@hassforge/base";
import { snakeCase } from "change-case";

export class TurnOffSwitchBinarySensorAutomation extends Automation {
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
      trigger: [Trigger.state(sensorTarget.id, { to: "off" })],
      action: [Action.turnOff(switchTarget.id)],
    });
  }
}
