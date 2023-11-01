export type EntityClass =
  | "calendar"
  | "sensor"
  | "switch"
  | "automation"
  | "light"
  | "climate"
  | "camera"
  | "water_heater"
  | "script"
  | "scene"
  | "binary_sensor"
  | "fan"
  | "cover"
  | "humidifer"
  | "media_player"
  | "remote"
  | "vacuum"
  | "siren"
  | "input_boolean";

export type EntityID<C extends EntityClass = EntityClass> = `${C}.${string}`;

export type AutomationID = EntityID<"automation">;
export type SirenID = EntityID<"siren">;
export type VacuumID = EntityID<"vacuum">;
export type CameraID = EntityID<"camera">;
export type SceneID = EntityID<"scene">;
export type WaterHeaterID = EntityID<"water_heater">;
export type ScriptID = EntityID<"script">;
export type InputBooleanID = EntityID<"input_boolean">;
export type MediaPlayerID = EntityID<"media_player">;
export type RemoteID = EntityID<"remote">;
export type HumidiferID = EntityID<"humidifer">;
export type CalendarID = EntityID<"calendar">;
export type SensorID = EntityID<"sensor">;
export type BinarySensorID = EntityID<"binary_sensor">;
export type ClimateID = EntityID<"climate">;
export type LightID = EntityID<"light">;
export type SwitchID = EntityID<"switch">;
export type CoverID = EntityID<"cover">;
export type FanID = EntityID<"fan">;

export const getEntityClass = (entityId: EntityID) =>
  entityId.split(".")[0] as EntityClass;
