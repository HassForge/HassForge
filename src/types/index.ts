import { Climate } from "./climate";
import { Homeassistant } from "./homeassistant";
import { Sensor } from "./sensor";
import { Template } from "./template";

export interface Package {
  climate?: Climate[];
  template?: Template[];
  homeassistant?: Homeassistant;
  sensor?: Sensor[];
}
