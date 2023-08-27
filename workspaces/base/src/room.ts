import { HAAutomation, HAPackage } from "@hassforge/types";
import {
  ClimateTarget,
  LightTarget,
  SwitchTarget,
  SensorTarget,
  BinarySensorTarget,
} from "./configuration";
import {
  backendProviderToHAPackage,
  BackendProvider,
} from "./backend-provider";
import { CardGenerator, FrontendProvider } from "./frontend-provider";

type PublicInterface<T> = Pick<T, keyof T>;

export type RoomExtension = BackendProvider & FrontendProvider;

export class Room implements RoomExtension {
  name: string;

  automations: HAAutomation[] = [];
  climates: ClimateTarget[] = [];
  sensors: SensorTarget[] = [];
  binarySensors: BinarySensorTarget[] = [];

  switches: SwitchTarget[] = [];
  lights: (LightTarget | SwitchTarget)[] = [];
  cards: { [key: string]: CardGenerator } = {};

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

  addBinarySensors(...sensor: BinarySensorTarget[]) {
    this.binarySensors.push(...sensor);
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

  extend<A extends any[], T extends RoomExtension>(
    mixin: new (room: Room, ...args: A) => T,
    ...args: A
  ): this & T {
    let { automations, climates, lights, sensors, switches, cards, ...rest } =
      new mixin(this, ...args);
    this.addAutomations(...(automations ?? []));
    this.addClimates(...(climates ?? []));
    this.addLights(...(lights ?? []));
    this.addSensors(...(sensors ?? []));
    this.addSwitches(...(switches ?? []));
    if (cards) {
      for (const key in cards) {
        this.cards[key] = cards[key]!.bind(this);
      }
    }
    Object.assign(this.cards, cards);

    for (const key in rest) {
      const value = (rest as any)[key];
      if (typeof value === "function") {
        (this as any)[key] = value.bind(this);
      } else {
        (this as any)[key] = value;
      }
    }
    Object.assign(this, rest);
    return this as this & PublicInterface<T>;
  }

  toPackage(): HAPackage {
    return backendProviderToHAPackage(this);
  }
}
