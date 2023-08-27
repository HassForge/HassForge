import { HABinarySensorDeviceClass } from "@hassforge/types/src/backend/binary-sensor/device-class";
import { EntityTarget } from "./entity";

export interface BinarySensorTarget extends EntityTarget<"binary_sensor"> {
  device_class?: HABinarySensorDeviceClass;
}
