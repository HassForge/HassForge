
export type EntityClass = "sensor" | "switch" | "light" | "climate";
export type EntityID<C extends EntityClass = EntityClass> = `${C}.${string}`;

export type SensorID = EntityID<"sensor">;
export type ClimateID = EntityID<"climate">;
export type LightID = EntityID<"light">;
export type SwitchID = EntityID<"switch">;
