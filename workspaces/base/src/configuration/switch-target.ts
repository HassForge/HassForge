import { HASwitchDeviceClass } from "@hassforge/types";
import { EntityTarget } from "./entity";

export interface SwitchTarget extends EntityTarget<"switch"> {
  device_class?: HASwitchDeviceClass;
}
