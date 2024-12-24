import {
  Action,
  Automation,
  BinarySensorTarget,
  SwitchTarget,
  Trigger,
} from "@hassforge/base";

export class TurnOnSwitchBinarySensorAutomation extends Automation {
  constructor(
    name: string,
    sensorTarget: BinarySensorTarget,
    switchTarget: SwitchTarget,
    description?: string
  ) {
    super({
      alias: name,
      description,
      trigger: [Trigger.state(sensorTarget.id, { to: "on" })],

      action: [Action.turnOn(switchTarget.id)],
    });
  }
}
