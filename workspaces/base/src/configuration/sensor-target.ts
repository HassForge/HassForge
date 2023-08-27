import { HASensorDeviceClass } from "@hassforge/types";
import { EntityTarget } from "./entity";

export interface SensorTarget extends EntityTarget<"sensor"> {
    device_class?: HASensorDeviceClass 
}
