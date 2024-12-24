import { HAAutomation, HAPackage, VerticalStackCard } from "@hassforge/types";
import {
  ClimateTarget,
  LightTarget,
  SwitchTarget,
  SensorTarget,
  BinarySensorTarget,
  MediaPlayerTarget,
  CameraTarget,
  InputBooleanTarget,
} from "./configuration";
import {
  backendProviderToHAPackage,
  BackendProvider,
} from "./backend-provider";
import { FrontendProvider, isFrontendProvider } from "./frontend-provider";
import merge from "ts-deepmerge";
import { InputDateTimeTarget } from "./configuration/input-datetime-target";

type PublicInterface<T> = Pick<T, keyof T>;

export type Provider<T extends Record<string, any> = never> =
  BackendProvider<T> & FrontendProvider;

export type RoomExtension<
  T extends string = string,
  P extends Provider = Provider<any>
> = {
  new (room: Room, ...args: any): P;
  id: T;
  singleton?: boolean;
};

type Tail<T extends any[]> = ((...args: T) => void) extends (
  arg1: any,
  ...rest: infer U
) => void
  ? U
  : never;

type RoomExtensionArgs<T extends RoomExtension> = Tail<
  ConstructorParameters<T>
>;

export type InstancedRoomExtension<
  T extends RoomExtension<string> = RoomExtension<string>
> = PublicInterface<InstanceType<T>>;

export type MergedRoomExtension<T extends RoomExtension<string>> = {
  extensions: {
    [key in T["id"]]: InstancedRoomExtension<T>;
  };
};

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export class Room implements BackendProvider<any>, FrontendProvider {
  name: string;

  _automations: HAAutomation[] = [];
  get automations() {
    return [
      ...this._automations,
      ...Object.values(this.extensions)
        .map((extension) => extension.automations)
        .flat()
        .filter(notEmpty),
    ];
  }

  _climates: ClimateTarget[] = [];
  get climates() {
    return [
      ...this._climates,
      ...Object.values(this.extensions)
        .map((extension) => extension.climates)
        .flat()
        .filter(notEmpty),
    ];
  }

  _sensors: SensorTarget[] = [];
  get sensors() {
    return [
      ...this._sensors,
      ...Object.values(this.extensions)
        .map((extension) => extension.sensors)
        .flat()
        .filter(notEmpty),
    ];
  }

  _mediaPlayers: MediaPlayerTarget[] = [];
  get mediaPlayers() {
    return [
      ...this._mediaPlayers,
      ...Object.values(this.extensions)
        .map((extension) => extension.mediaPlayers)
        .flat()
        .filter(notEmpty),
    ];
  }

  _binarySensors: BinarySensorTarget[] = [];
  get binarySensors() {
    return [
      ...this._binarySensors,
      ...Object.values(this.extensions)
        .map((extension) => extension.binarySensors)
        .flat()
        .filter(notEmpty),
    ];
  }

  _switches: SwitchTarget[] = [];
  get switches() {
    return [
      ...this._switches,
      ...Object.values(this.extensions)
        .map((extension) => extension.switches)
        .flat()
        .filter(notEmpty),
    ];
  }

  _lights: (LightTarget | SwitchTarget)[] = [];
  get lights() {
    return [
      ...this._lights,
      ...Object.values(this.extensions)
        .map((extension) => extension.lights)
        .flat()
        .filter(notEmpty),
    ];
  }

  _cameras: CameraTarget[] = [];
  get cameras() {
    return [
      ...this._cameras,
      ...Object.values(this.extensions)
        .map((extension) => extension.cameras)
        .flat()
        .filter(notEmpty),
    ];
  }

  _inputDateTimes: InputDateTimeTarget[] = [];
  get inputDateTimes() {
    return [
      ...this._inputDateTimes,
      ...Object.values(this.extensions)
        .map((extension) => extension.inputDateTimes)
        .flat()
        .filter(notEmpty),
    ];
  }

  _inputBooleans: InputBooleanTarget[] = [];
  get inputBooleans() {
    return [
      ...this._inputBooleans,
      ...Object.values(this.extensions)
        .map((extension) => extension.inputBooleans)
        .flat()
        .filter(notEmpty),
    ];
  }

  get integrations() {
    console.log(
      Object.values(this.extensions)
        .map(({ integrations }) => integrations)
        .flat()
        .filter(notEmpty)
    );
    return merge(
      {},
      ...Object.values(this.extensions)
        .map(({ integrations }) => integrations)
        .flat()
        .filter(notEmpty)
    );
  }

  extensions: { [key: string]: InstancedRoomExtension } = {};

  constructor(name: string) {
    this.name = name;
  }

  addAutomations(...automations: HAAutomation[]) {
    this._automations.push(...automations);
    return this;
  }

  addCameras(...cameras: CameraTarget[]) {
    this._cameras.push(...cameras);
    return this;
  }

  addClimates(...climates: ClimateTarget[]) {
    this._climates.push(...climates);
    return this;
  }

  addSensors(...sensor: SensorTarget[]) {
    this._sensors.push(...sensor);
    return this;
  }

  addTemperatureSensors(...sensor: SensorTarget[]) {
    this._sensors.push(
      ...sensor.map(
        (sensor): SensorTarget => ({ ...sensor, device_class: "temperature" })
      )
    );
    return this;
  }

  addBinarySensors(...sensor: BinarySensorTarget[]) {
    this._binarySensors.push(...sensor);
    return this;
  }

  addSwitches(...haSwitch: SwitchTarget[]) {
    this._switches.push(...haSwitch);
    return this;
  }

  addLights(...haLight: (LightTarget | SwitchTarget)[]) {
    this._lights.push(...haLight);
    return this;
  }

  addMediaPlayers(...haMediaPlayer: MediaPlayerTarget[]) {
    this._mediaPlayers.push(...haMediaPlayer);
    return this;
  }

  addInputDateTime(...inputDateTime: InputDateTimeTarget[]) {
    this._inputDateTimes.push(...inputDateTime);
    return this;
  }

  addInputBoolean(...inputBoolean: InputBooleanTarget[]) {
    this._inputBooleans.push(...inputBoolean);
    return this;
  }

  extend<T extends RoomExtension>(extension: T, ...args: RoomExtensionArgs<T>) {
    const extensionInstance = new extension(this, ...args);
    this.extensions[extension.id] = extensionInstance as InstancedRoomExtension;

    return this as this & MergedRoomExtension<T>;
  }

  toPackage(): HAPackage {
    return backendProviderToHAPackage(this);
  }

  card = (): VerticalStackCard => {
    const cards = Object.values(this.extensions)
      .flat()
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
