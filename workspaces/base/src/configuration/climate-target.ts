import { ClimateID } from "@hassforge/types";
import { EntityTarget } from "./entity";

export interface ClimateTarget extends EntityTarget<"climate"> {
  id: ClimateID;
  name: string;

  heatModeAttribute?: string;
  temperatureAttribute?: string;
  setpointAttribute?: string;
}

export const isClimateTarget = (x: any): x is ClimateTarget =>
  typeof x === "object" &&
  typeof x.id === "string" &&
  x.id.startsWith("climate");

export const DEFAULT_HEAT_MODE_ATTRIBUTE = "hvac_action";
export const DEFAULT_TEMPERATURE_ATTRIBUTE = "current_temperature";
export const DEFAULT_SETPOINT_ATTRIBUTE = "temperature";
