import { HAAutomation, HAPackage, VerticalStackCard } from "@hassforge/types";
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
  isBackendProvider,
} from "./backend-provider";
import { FrontendProvider, isFrontendProvider } from "./frontend-provider";

type PublicInterface<T> = Pick<T, keyof T>;

export type Provider = BackendProvider & FrontendProvider;

export type RoomExtension<
  T extends string = string,
  P extends Provider = Provider
> = {
  new (room: Room, ...args: any): P;
  id: T;
};

export type InstancedRoomExtension<
  T extends RoomExtension<string> = RoomExtension<string>
> = PublicInterface<InstanceType<T>>;

export type MergedRoomExtension<T extends RoomExtension<string>> = {
  extensions: { [key in T["id"]]: InstancedRoomExtension<T> };
};

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export class Room implements BackendProvider, FrontendProvider {
  name: string;

  automations: HAAutomation[] = [];
  climates: ClimateTarget[] = [];
  sensors: SensorTarget[] = [];
  binarySensors: BinarySensorTarget[] = [];

  switches: SwitchTarget[] = [];
  lights: (LightTarget | SwitchTarget)[] = [];
  extensions: { [key: string]: InstancedRoomExtension } = {};

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

  extend<A extends any[], T extends RoomExtension>(extension: T, ...args: A) {
    const extensionInstance = new extension(this, ...args);
    this.extensions[extension.id] = extensionInstance as InstancedRoomExtension;

    return this as this & MergedRoomExtension<T>;
  }

  toPackage(): HAPackage {
    return backendProviderToHAPackage(
      this,
      ...Object.values(this.extensions).filter(isBackendProvider)
    );
  }

  card = (): VerticalStackCard => {
    const cards = Object.values(this.extensions)
      .filter(isFrontendProvider)
      .map((extension) => extension.card ?? extension.cards)
      .filter(notEmpty)
      .flat()
      .map((cardGenerator) => cardGenerator())
      .flat();

    return {
      type: "vertical-stack",
      cards: cards,
    };
  };

  hasExtension<T extends RoomExtension<string>>(
    extension: T
  ): this is Room & MergedRoomExtension<T> {
    return !!(this as unknown as Room & MergedRoomExtension<T>).extensions[
      extension.id
    ];
  }
}
