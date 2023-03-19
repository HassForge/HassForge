import {
  Automation,
  CreatableEntity,
  GenericThermostatClimate,
  Sensor,
  TemplateSensor,
} from "./creatables";
import {
  HAPackage,
  HAClimate,
  HASensor,
  HAAutomation,
  HATemplate,
  HACustomizeDictionary,
  HATemplateSensor,
} from "@hassbuilder/types";
import { EntityTarget } from "./configuration";
import { JsonIgnore, toJSON } from "./utils";

export type NonCreatable<T> = T extends CreatableEntity ? never : T;

export class HassBuilderPackage implements HAPackage {
  @JsonIgnore
  climateMap: { [key: string]: HAClimate } = {};
  @JsonIgnore
  templateMap: { [key: string]: HATemplateSensor } = {};
  @JsonIgnore
  sensorMap: { [key: string]: HASensor } = {};
  @JsonIgnore
  customize: HACustomizeDictionary = {};
  @JsonIgnore
  automationMap: { [key: string]: HAAutomation } = {};

  public get climate() {
    return Object.values(this.climateMap);
  }

  public get template() {
    return [{ sensor: Object.values(this.templateMap) }];
  }

  public get sensor() {
    return Object.values(this.sensorMap);
  }

  public get homeassistant() {
    return {
      customize: this.customize,
    };
  }

  public get automation() {
    return Object.values(this.automationMap);
  }

  mergePackage(...packages: HAPackage[]) {
    packages.forEach((pkg) => {
      if (pkg.automation) this.addAutomation(...pkg.automation);
      if (pkg.climate) this.addClimate(...pkg.climate);
      if (pkg.homeassistant) this.addCustomization(pkg.homeassistant.customize);
      if (pkg.sensor) this.addSensor(...pkg.sensor);
      if (pkg.template) this.addTemplate(...pkg.template);
    });
    return this;
  }

  public addClimate(...climates: HAClimate[]) {
    climates.forEach((climate) => (this.climateMap[climate.name] = climate));
    return this;
  }

  public addTemplate(...templates: HATemplate[]) {
    return this.addTemplateSensor(
      ...templates.flatMap((template) => template.sensor)
    );
  }

  public addTemplateSensor(...templates: HATemplateSensor[]) {
    templates.forEach(
      (template) => (this.templateMap[template.name] = template)
    );
    return this;
  }

  public addSensor(...sensors: HASensor[]) {
    sensors.forEach((sensor) => (this.sensorMap[sensor.name] = sensor));
    return this;
  }

  public addAutomation(...automations: HAAutomation[]) {
    automations.forEach(
      (automation) => (this.automationMap[automation.alias] = automation)
    );
    return this;
  }

  public addCustomization(dict: HACustomizeDictionary) {
    this.customize = { ...this.customize, ...dict };
    return this;
  }

  addEntity(...entities: CreatableEntity[]) {
    entities.forEach((entity) => {
      if (entity instanceof GenericThermostatClimate) {
        this.addClimate(entity);
      } else if (entity instanceof Automation) {
        this.addAutomation(entity);
      } else if (entity instanceof Sensor) {
        this.addSensor(entity);
      } else if (entity instanceof TemplateSensor) {
        this.addTemplateSensor(entity);
      }
    });
    return this;
  }

  addExistingEntity(...entities: NonCreatable<EntityTarget>[]) {
    return this.addCustomization(
      entities
        .filter((entity) => !(entity instanceof CreatableEntity))
        .reduce<HACustomizeDictionary>(
          (prev, curr) => ({
            ...prev,
            [curr.id]: { friendly_name: curr.name },
          }),
          {}
        )
    );
  }

  toJSON() {
    return toJSON.bind(this)()
  }
}
