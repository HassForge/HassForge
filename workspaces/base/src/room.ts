import { HACustomizeDictionary, HAPackage } from "@hassbuilder/types";
import {
  ClimateTarget,
  LightTarget,
  SwitchTarget,
  SensorTarget,
  EntityTarget,
} from "./configuration";
import {
  GenericThermostatClimate,
  TemplateSensor,
  Sensor,
  CreatableEntity,
} from "./creatables";

export class Room implements HAPackage {
  name: string;

  climates: ClimateTarget[] = [];
  sensors: SensorTarget[] = [];

  switches: SwitchTarget[] = [];
  lights: LightTarget[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addClimate(...climates: ClimateTarget[]) {
    this.climates.push(...climates);
    return this;
  }

  addSensors(...sensor: SensorTarget[]) {
    this.sensors.push(...sensor);
    return this;
  }

  addSwitches(...haSwitch: SwitchTarget[]) {
    this.switches.push(...haSwitch);
    return this;
  }

  addLights(...haLight: LightTarget[]) {
    this.lights.push(...haLight);
  }

  get climate() {
    return this.climates.filter(
      (climate): climate is GenericThermostatClimate =>
        climate instanceof GenericThermostatClimate
    );
  }

  get template() {
    const sensors = this.sensors.filter(
      (sensor): sensor is TemplateSensor => sensor instanceof TemplateSensor
    );
    return sensors.length ? [{ sensor: sensors }] : undefined;
  }

  get sensor() {
    const sensors = this.sensors.filter(
      (sensor): sensor is Sensor => sensor instanceof Sensor
    );
    return sensors.length ? sensors : undefined;
  }

  get homeassistant() {
    const entities: EntityTarget[] = [
      ...this.climates,
      ...this.sensors,
      ...this.switches,
      ...this.lights,
    ].filter((entity) => !(entity instanceof CreatableEntity));
    return {
      customize: entities.reduce<HACustomizeDictionary>(
        (prev, target) =>
          target.name
            ? {
                ...prev,
                [target.id]: { friendly_name: target.name },
              }
            : prev,
        {}
      ),
    };
  }
}
