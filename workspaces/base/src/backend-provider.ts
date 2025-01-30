import {
  HAAutomation,
  HABinarySensor,
  HAClimate,
  HACustomizeDictionary,
  HAInputBooleanDictionary,
  HAInputDateTimeDictionary,
  HAInputNumberDictionary,
  HAInputTextDictionary,
  HALight,
  HAPackage,
  HASensor,
  HATemplate,
  HAUtilityMeterDictionary,
} from "@hassforge/types";
import {
  ClimateTarget,
  LightTarget,
  SwitchTarget,
  SensorTarget,
  BinarySensorTarget,
  MediaPlayerTarget,
  CameraTarget,
  InputBooleanTarget,
  InputTextTarget,
  InputNumberTarget,
} from "./configuration";
import {
  CreatableEntity,
  isCreatableLight,
  isCreatableBinarySensor,
  isCreatableClimate,
  isCreatableTemplate,
  isCreatableSensor,
  isCreatableInputDateTime,
  isCreatableInputBoolean,
  isCreatableInputText,
  isCreatableInputNumber,
} from "./creatables";
import merge from "ts-deepmerge";
import { InputDateTimeTarget } from "./configuration/input-datetime-target";
import { isCreatableUtilityMeter } from "./creatables/utility-meter";

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
  readonly inputDateTimes?: InputDateTimeTarget[];
  readonly inputBooleans?: InputBooleanTarget[];
  readonly inputTexts?: InputTextTarget[];
  readonly inputNumbers?: InputNumberTarget[];
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

const isEmptyObject = (obj?: object): boolean => {
  return Object.keys(obj ?? {}).length === 0;
};

const pruneEmptyKeys = ({
  automation,
  binary_sensor,
  climate,
  homeassistant,
  sensor,
  template,
  light,
  input_boolean,
  input_datetime,
  input_text,
  input_number,
  utility_meter,
  ...rest
}: HAPackage): HAPackage => {
  return {
    automation: isEmptyArray(automation) ? undefined : automation,
    binary_sensor: isEmptyArray(binary_sensor) ? undefined : binary_sensor,
    climate: isEmptyArray(climate) ? undefined : climate,
    sensor: isEmptyArray(sensor) ? undefined : sensor,
    template: isEmptyArray(template) ? undefined : template,
    light: isEmptyArray(light) ? undefined : light,
    input_boolean: isEmptyObject(input_boolean) ? undefined : input_boolean,
    input_datetime: isEmptyObject(input_datetime) ? undefined : input_datetime,
    input_text: isEmptyObject(input_text) ? undefined : input_text,
    input_number: isEmptyObject(input_number) ? undefined : input_number,
    utility_meter: isEmptyObject(utility_meter) ? undefined : utility_meter,
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
    input_datetime: rooms
      .map((room) => room.inputDateTimes)
      .filter(notEmpty)
      .filter((inputDateTimes) => inputDateTimes.length > 0)
      .flat()
      .filter(isCreatableInputDateTime)
      .reduce<HAInputDateTimeDictionary>(
        (acc, curr) =>
          ({
            [curr.id.replace("input_datetime.", "")]: curr,
            ...acc,
          } as unknown as HAInputDateTimeDictionary),
        {}
      ),
    input_boolean: rooms
      .map((room) => room.inputBooleans)
      .filter(notEmpty)
      .filter((inputBooleans) => inputBooleans.filter(isCreatableInputBoolean))
      .filter((inputBooleans) => inputBooleans.length > 0)
      .flat()
      .reduce<HAInputBooleanDictionary>(
        (acc, item) =>
          ({
            [item.id.replace("input_boolean.", "")]: item,
            ...acc,
          } as unknown as HAInputBooleanDictionary),
        {}
      ),
    input_text: rooms
      .map((room) => room.inputTexts)
      .filter(notEmpty)
      .filter((inputTexts) => inputTexts.filter(isCreatableInputText))
      .filter((inputTexts) => inputTexts.length > 0)
      .flat()
      .reduce<HAInputTextDictionary>(
        (acc, item) =>
          ({
            [item.id.replace("input_text.", "")]: item,
            ...acc,
          } as unknown as HAInputTextDictionary),
        {}
      ),
    input_number: rooms
      .map((room) => room.inputNumbers)
      .filter(notEmpty)
      .filter((inputNumbers) => inputNumbers.filter(isCreatableInputNumber))
      .filter((inputNumbers) => inputNumbers.length > 0)
      .flat()
      .reduce<HAInputNumberDictionary>(
        (acc, item) =>
          ({
            [item.id.replace("input_number.", "")]: item,
            ...acc,
          } as unknown as HAInputNumberDictionary),
        {}
      ),
    utility_meter: rooms
      .map((room) => room.sensors)
      .filter(notEmpty)
      .filter((sensors) => sensors.filter(isCreatableUtilityMeter))
      .filter((sensors) => sensors.length > 0)
      .flat()
      .reduce<HAUtilityMeterDictionary>(
        (acc, item) =>
          ({
            [item.id.replace("utility_meter.", "")]: item,
            ...acc,
          } as unknown as HAUtilityMeterDictionary),
        {}
      ),
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
