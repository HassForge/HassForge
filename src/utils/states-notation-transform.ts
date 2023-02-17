import { EntityID, EntityIDType } from "../types/sensor";

type StatesNotation =
  | `states.${EntityIDType}.${string}`
  | `states.${EntityIDType}['${string}']`;

const isDigit = (character: string): boolean => {
  const num = parseInt(character); //or just Number.parseInt
  return !isNaN(num);
};

export const statesNotationTransform = (sensorId: EntityID): StatesNotation => {
  const sensorType = sensorId.split(".")[0] as EntityIDType;
  const sensorName = sensorId.split(".")[1];
  const firstLetter = sensorName[0];
  return isDigit(firstLetter)
    ? `states.${sensorType}['${sensorName}']`
    : `states.${sensorType}.${sensorName}`;
};
