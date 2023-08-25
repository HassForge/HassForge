import { HAAutomation, HACustomizeDictionary, HAPackage } from "@hassbuilder/types";
import {
  ClimateTarget,
  LightTarget,
  SwitchTarget,
  SensorTarget,
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
  readonly switches?: SwitchTarget[];
  readonly lights?: (LightTarget | SwitchTarget)[];
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function backendProviderToHAPackage(...rooms: BackendProvider[]): HAPackage {
  return {
    automation: rooms.flatMap(({automations}) => automations).filter(notEmpty),
    binary_sensor: rooms
      .map((room) => room.sensors)
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
  };
}
