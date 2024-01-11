import {
  HAAutomation,
  HABinarySensor,
  HAClimate,
  HACustomizeDictionary,
  HALight,
  HAPackage,
  HASensor,
  HATemplate,
} from "@hassforge/types";
import {
  ClimateTarget,
  LightTarget,
  SwitchTarget,
  SensorTarget,
  BinarySensorTarget,
  MediaPlayerTarget,
  CameraTarget,
} from "./configuration";
import {
  CreatableEntity,
  isCreatableLight,
  isCreatableBinarySensor,
  isCreatableClimate,
  isCreatableTemplate,
  isCreatableSensor,
} from "./creatables";
import merge from "ts-deepmerge";

export interface BackendProvider<T extends Record<string, any> = never> {
  readonly automations?: HAAutomation[];
  readonly climates?: ClimateTarget[];
  readonly cameras?: CameraTarget[];
  readonly mediaPlayers?: MediaPlayerTarget[];
  readonly sensors?: SensorTarget[];
  readonly binarySensors?: BinarySensorTarget[];
  readonly switches?: SwitchTarget[];
  readonly lights?: (LightTarget | SwitchTarget)[];
  readonly integrations?: T;
}

export const isBackendProvider = (x: any): x is BackendProvider => {
  return (
    "automations" in x ||
    "climates" in x ||
    "sensors" in x ||
    "switches" in x ||
    "lights" in x
  );
};

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}
const isEmptyArray = (arr?: any[]): boolean => {
  return arr?.length === 0;
};

const pruneEmptyKeys = ({
  automation,
  binary_sensor,
  climate,
  homeassistant,
  sensor,
  template,
  light,
  ...rest
}: HAPackage): HAPackage => {
  return {
    automation: isEmptyArray(automation) ? undefined : automation,
    binary_sensor: isEmptyArray(binary_sensor) ? undefined : binary_sensor,
    climate: isEmptyArray(climate) ? undefined : climate,
    sensor: isEmptyArray(sensor) ? undefined : sensor,
    template: isEmptyArray(template) ? undefined : template,
    light: isEmptyArray(light) ? undefined : light,
    homeassistant:
      Object.keys(homeassistant?.customize ?? {}).length === 0
        ? undefined
        : homeassistant,
    ...rest,
  };
};

export function backendProviderToHAPackage(
  ...rooms: BackendProvider<any>[]
): HAPackage {
  return pruneEmptyKeys({
    ...merge(
      ...rooms.flatMap(({ integrations }) => integrations).filter(notEmpty)
    ),
    automation: rooms
      .flatMap(({ automations }) => automations)
      .filter(notEmpty),
    light: rooms
      .map((room) => room.lights)
      .filter(notEmpty)
      .flat()
      .filter(isCreatableLight) as unknown as HALight[],
    binary_sensor: rooms
      .map((room) => room.binarySensors)
      .filter(notEmpty)
      .flat()
      .filter(isCreatableBinarySensor) as unknown as HABinarySensor[],
    climate: rooms
      .map((room) => room.climates)
      .filter(notEmpty)
      .flat()
      .filter(isCreatableClimate) as unknown as HAClimate[],
    template: rooms
      .map((room) => room.sensors)
      .filter(notEmpty)
      .map((sensors) => sensors.filter(isCreatableTemplate))
      .filter((sensors) => sensors.length > 0)
      .map((sensors) => ({ sensor: sensors })) as unknown as HATemplate[],
    sensor: rooms
      .map((room) => room.sensors)
      .filter(notEmpty)
      .map((sensors) => sensors.filter(isCreatableSensor))
      .filter((sensors) => sensors.length > 0)
      .flat() as unknown as HASensor[],
    homeassistant: {
      customize: rooms
        .map((room) =>
          [
            room.climates,
            room.sensors,
            room.switches,
            room.lights,
            room.cameras,
            room.mediaPlayers,
          ]
            .filter(notEmpty)
            .flat()
        )
        .filter((entity) => !(entity instanceof CreatableEntity))
        .flat()
        .reduce<HACustomizeDictionary>(
          (
            prev,
            {
              name,
              id,
              assumed_state,
              device_class,
              entity_picture,
              icon,
              initial_state,
              unit_of_measurement,
            }
          ) => ({
            ...prev,
            [id]: {
              friendly_name: `${name}`,
              assumed_state,
              device_class,
              entity_picture,
              icon,
              initial_state,
              unit_of_measurement,
            },
          }),
          {}
        ),
    },
  });
}
