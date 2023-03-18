import { HAAutomation } from "./automation";
import { HAClimate } from "./climate";
import { HAHomeassistant } from "./homeassistant";
import { HASensor } from "./sensor";
import { HATemplate } from "./template";

export interface HAPackage {
  climate?: HAClimate[];
  template?: HATemplate[];
  sensor?: HASensor[];
  homeassistant?: HAHomeassistant;
  automation?: HAAutomation[];
}

