import { HAAutomation } from "./automation";
import { HABinarySensor } from "./binary-sensor";
import { HAClimate } from "./climate";
import { HAHomeassistant } from "./homeassistant";
import { HAInputBooleanDictionary } from "./input-boolean";
import { HAInputDateTimeDictionary } from "./input-datetime";
import { HAInputNumberDictionary } from "./input-number";
import { HAInputTextDictionary } from "./input-text";
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
  input_text?: HAInputTextDictionary;
  input_number?: HAInputNumberDictionary;
}
