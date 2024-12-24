import { Action, Automation, Condition, Trigger } from "@hassforge/base";
import { BinarySensorID, Delay, HACondition } from "@hassforge/types";

export interface MotionActivatedAutomationOptions {
  alias: string;
  motionSensors: BinarySensorID[];
  delayOn?: Delay;
  delayOff?: Delay;
  switchEntities: Action.Switchable[];
  onConditions?: HACondition[];
}

export class MotionActivatedAutomation extends Automation {
  constructor({
    alias,
    motionSensors,
    switchEntities,
    delayOn,
    delayOff,
    onConditions,
  }: MotionActivatedAutomationOptions) {
    super({
      alias,
      mode: "restart",
      trigger: motionSensors.flatMap((sensorId) => [
        Trigger.state(sensorId, {
          id: "detected",
          to: "on",
        }),
        Trigger.state(sensorId, {
          id: "clear",
          to: "off",
        }),
      ]),
      action: [
        Action.choose([
          {
            conditions: onConditions
              ? Condition.and(...onConditions, Condition.trigger("detected"))
              : Condition.trigger("detected"),
            sequence: [
              ...(delayOn ? [Action.delay(delayOn)] : []),
              ...switchEntities.flatMap((switchEntityId) =>
                Action.turnOn(switchEntityId)
              ),
            ],
          },
          {
            conditions: Condition.trigger("clear"),
            sequence: [
              ...(delayOff ? [Action.delay(delayOff)] : []),
              ...switchEntities.flatMap((switchEntityId) =>
                Action.turnOff(switchEntityId)
              ),
            ],
          },
        ]),
      ],
    });
  }
}
