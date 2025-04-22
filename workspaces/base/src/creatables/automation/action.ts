import {
  HAAction,
  CallServiceAction,
  ChooseAction,
  ConditionAction,
  DelayAction,
  DeviceAction,
  EventAction,
  RepeatAction,
  SceneAction,
  ScriptAction,
  WaitAction,
  WaitTemplateAction,
  getEntityClass,
  AutomationID,
  FanID,
  SwitchID,
  LightID,
  CoverID,
  SirenID,
  HumidiferID,
  InputBooleanID,
  MediaPlayerID,
  VacuumID,
  RemoteID,
  ClimateID,
  CameraID,
  SceneID,
  ScriptID,
  WaterHeaterID,
  Delay,
} from "@hassforge/types";

export namespace Action {
  export function parallel(...actions: HAAction[]) {
    return {
      parallel: actions,
    };
  }

  export function callService(
    service: string,
    options?: Omit<CallServiceAction, "service">
  ): CallServiceAction {
    return { service, ...options };
  }

  export type Switchable =
    | AutomationID
    | CameraID
    | ClimateID
    | FanID
    | HumidiferID
    | InputBooleanID
    | LightID
    | MediaPlayerID
    | RemoteID
    | SceneID
    | ScriptID
    | SirenID
    | SwitchID
    | VacuumID
    | WaterHeaterID;

  export function turnOn(
    entityId: Switchable,
    data?: {
      brightness?: number;
      rgb_color?: [number, number, number];
    }
  ): CallServiceAction {
    const entityClass = getEntityClass(entityId);
    return Action.callService(`${entityClass}.turn_on`, {
      target: { entity_id: entityId },
      data,
    });
  }

  export function turnOff(entityId: Switchable): CallServiceAction {
    const entityClass = getEntityClass(entityId);
    return Action.callService(`${entityClass}.turn_off`, {
      target: { entity_id: entityId },
    });
  }

  export type Toggleable =
    | AutomationID
    | ClimateID
    | CoverID
    | FanID
    | HumidiferID
    | InputBooleanID
    | MediaPlayerID
    | RemoteID
    | VacuumID
    | SwitchID
    | LightID
    | FanID
    | SirenID;

  export function toggle(entityId: Toggleable): CallServiceAction {
    const entityClass = getEntityClass(entityId);
    return Action.callService(`${entityClass}.toggle`, {
      target: { entity_id: entityId },
    });
  }

  export function choose(
    choose: ChooseAction["choose"],
    defaultActions?: ChooseAction["default"]
  ): ChooseAction {
    return { choose, default: defaultActions };
  }

  export function condition(
    condition: string,
    options?: Omit<ConditionAction, "condition">
  ): ConditionAction {
    return { condition, ...options };
  }

  export function delay(delay: Delay): DelayAction {
    return { delay };
  }

  export function device(options: DeviceAction): DeviceAction {
    return { ...options };
  }

  export function event(
    event: string,
    options?: Omit<EventAction, "event">
  ): EventAction {
    return { event, ...options };
  }

  export function repeat(
    repeat: Omit<RepeatAction["repeat"], "sequence">,
    sequence: HAAction | HAAction[]
  ): RepeatAction {
    return { repeat: { ...repeat, sequence } };
  }

  export function scene(scene: string): SceneAction {
    return { scene };
  }

  export function script(script: string): ScriptAction {
    return { script };
  }

  export function wait(
    timeout: string | number,
    continue_on_timeout?: boolean
  ): WaitAction {
    return { wait: { timeout, continue_on_timeout } };
  }

  export function waitTemplate(
    wait_template: string,
    options?: Omit<WaitTemplateAction, "wait_template">
  ): WaitTemplateAction {
    return { wait_template, ...options };
  }
}
