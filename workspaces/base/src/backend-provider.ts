import {
  HAAutomation,
  HACustomizeDictionary,
  HAPackage,
} from "@hassforge/types";
import {
  ClimateTarget,
  LightTarget,
  SwitchTarget,
  SensorTarget,
  BinarySensorTarget,
} from "./configuration";
import {
  GenericThermostatClimate,
  TemplateSensor,
  Sensor,
  CreatableEntity,
  TrendBinarySensor,
} from "./creatables";

export interface BackendProvider {
  readonly automations?: HAAutomation[];
  readonly climates?: ClimateTarget[];
  readonly sensors?: SensorTarget[];
  readonly binarySensors?: BinarySensorTarget[];
  readonly switches?: SwitchTarget[];
  readonly lights?: (LightTarget | SwitchTarget)[];
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
}: HAPackage): HAPackage => {
  return {
    automation: isEmptyArray(automation) ? undefined : automation,
    binary_sensor: isEmptyArray(binary_sensor) ? undefined : binary_sensor,
    climate: isEmptyArray(climate) ? undefined : climate,
    sensor: isEmptyArray(sensor) ? undefined : sensor,
    template: isEmptyArray(template) ? undefined : template,
    homeassistant:
      Object.keys(homeassistant?.customize ?? {}).length === 0
        ? undefined
        : homeassistant,
  };
};

export function backendProviderToHAPackage(
  ...rooms: BackendProvider[]
): HAPackage {
  return pruneEmptyKeys({
    automation: rooms
      .flatMap(({ automations }) => automations)
      .filter(notEmpty),
    binary_sensor: rooms
      .map((room) => room.binarySensors)
      .filter(notEmpty)
      .map((sensors) =>
        sensors.filter(
          (sensor): sensor is TrendBinarySensor =>
            sensor instanceof TrendBinarySensor
        )
      )
      .flat(),
    climate: rooms
      .map((room) => room.climates)
      .filter(notEmpty)
      .flatMap((climates) =>
        climates.filter(
          (climate): climate is GenericThermostatClimate =>
            climate instanceof GenericThermostatClimate
        )
      ),
    template: rooms
      .map((room) => room.sensors)
      .filter(notEmpty)
      .map((sensors) =>
        sensors.filter(
          (sensor): sensor is TemplateSensor => sensor instanceof TemplateSensor
        )
      )
      .filter((sensors) => sensors.length > 0)
      .map((sensors) => ({ sensor: sensors })),
    sensor: rooms
      .map((room) => room.sensors)
      .filter(notEmpty)
      .map((sensors) =>
        sensors.filter((sensor): sensor is Sensor => sensor instanceof Sensor)
      )
      .filter((sensors) => sensors.length > 0)
      .flat(),
    homeassistant: {
      customize: rooms
        .map((room) =>
          [room.climates, room.sensors, room.switches, room.lights]
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
