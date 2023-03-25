import { HAAutomation } from "./automation";
import { HABinarySensor } from "./binary-sensor";
import { HAClimate } from "./climate";
import { HAHomeassistant } from "./homeassistant";
import { HASensor } from "./sensor";
import { HATemplate } from "./template";

export interface HAPackage {
  climate?: HAClimate[];
  template?: HATemplate[];
  sensor?: HASensor[];
  binary_sensor?: HABinarySensor[];
  homeassistant?: HAHomeassistant;
  automation?: HAAutomation[];
}
