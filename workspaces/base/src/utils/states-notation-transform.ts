import { EntityID, EntityClass } from "@hassbuilder/types";

type StatesNotation =
  | `states.${EntityClass}.${string}`
  | `states.${EntityClass}['${string}']`;

const isDigit = (character: string): boolean => {
  const num = parseInt(character); //or just Number.parseInt
  return !isNaN(num);
};

export const statesNotationTransform = (sensorId: EntityID): StatesNotation => {
  const sensorType = sensorId.split(".")[0] as EntityClass;
  const sensorName = sensorId.split(".")[1];
  const firstLetter = sensorName[0];
  return isDigit(firstLetter)
    ? `states.${sensorType}['${sensorName}']`
    : `states.${sensorType}.${sensorName}`;
};
