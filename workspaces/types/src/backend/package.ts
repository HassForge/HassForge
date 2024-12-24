import { HAAutomation } from "./automation";
import { HABinarySensor } from "./binary-sensor";
import { HAClimate } from "./climate";
import { HAHomeassistant } from "./homeassistant";
import { HAInputBooleanDictionary } from "./input-boolean";
import { HAInputDateTimeDictionary } from "./input-datetime";
import { HALight } from "./light";
import { HASensor } from "./sensor";
import { HATemplate } from "./template";

export interface HAPackage {
  light?: HALight[];
  climate?: HAClimate[];
  template?: HATemplate[];
  sensor?: HASensor[];
  binary_sensor?: HABinarySensor[];
  homeassistant?: HAHomeassistant;
  automation?: HAAutomation[];
  input_datetime?: HAInputDateTimeDictionary;
  input_boolean?: HAInputBooleanDictionary;
}
