import { HAAutomation, HAPackage } from "@hassforge/types";
import {
  ClimateTarget,
  LightTarget,
  SwitchTarget,
  SensorTarget,
} from "./configuration";
import {
  backendProviderToHAPackage,
  BackendProvider,
} from "./backend-provider";

export type RoomExtension<
  T extends BackendProvider,
  A extends any[] = []
> = (room: Room, ...args: A) => T;

export class Room implements BackendProvider {
  name: string;

  automations: HAAutomation[] = [];
  climates: ClimateTarget[] = [];
  sensors: SensorTarget[] = [];

  switches: SwitchTarget[] = [];
  lights: (LightTarget | SwitchTarget)[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addAutomations(...automations: HAAutomation[]) {
    this.automations.push(...automations);
    return this;
  }

  addClimates(...climates: ClimateTarget[]) {
    this.climates.push(...climates);
    return this;
  }

  addSensors(...sensor: SensorTarget[]) {
    this.sensors.push(...sensor);
    return this;
  }

  addSwitches(...haSwitch: SwitchTarget[]) {
    this.switches.push(...haSwitch);
    return this;
  }

  addLights(...haLight: (LightTarget | SwitchTarget)[]) {
    this.lights.push(...haLight);
    return this;
  }

  extend<A extends any[], T extends BackendProvider>(
    mixin: RoomExtension<T, A>,
    ...args: A
  ): this & T {
    const { climates, lights, sensors, switches, automations, ...rest } = mixin(
      this,
      ...args
    );
    return Object.assign(this, rest)
      .addAutomations(...(automations ?? []))
      .addClimates(...(climates ?? []))
      .addLights(...(lights ?? []))
      .addSensors(...(sensors ?? []))
      .addSwitches(...(switches ?? [])) as this & T;
  }

  toPackage(): HAPackage {
    return backendProviderToHAPackage(this);
  }
}
