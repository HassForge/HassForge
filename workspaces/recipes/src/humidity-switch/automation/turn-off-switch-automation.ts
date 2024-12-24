import {
  Action,
  Automation,
  BinarySensorTarget,
  SwitchTarget,
  Trigger,
} from "@hassforge/base";

export class TurnOffSwitchBinarySensorAutomation extends Automation {
  constructor(
    name: string,
    sensorTarget: BinarySensorTarget,
    switchTarget: SwitchTarget,
    description?: string
  ) {
    super({
      alias: name,
      description,
      trigger: [Trigger.state(sensorTarget.id, { to: "off" })],
      action: [Action.turnOff(switchTarget.id)],
    });
  }
}
