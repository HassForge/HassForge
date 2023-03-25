import {
  HAPackage,
  HAClimate,
  HASensor,
  HAAutomation,
  HATemplate,
  HACustomizeDictionary,
  HATemplateSensor,
  HABinarySensor,
  HABayesianBinarySensor,
  HATrendBinarySensor,
} from "@hassbuilder/types";
import { JsonIgnore, toJSON } from "./utils";

export class HassBuilderPackage implements HAPackage {
  @JsonIgnore
  climateMap: { [key: string]: HAClimate } = {};
  @JsonIgnore
  templateMap: { [key: string]: HATemplateSensor } = {};
  @JsonIgnore
  sensorMap: { [key: string]: HASensor } = {};
  @JsonIgnore
  binarySensorMap: { [key: string]: HABinarySensor } = {};
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

  public get binary_sensor() {
    return Object.values(this.binarySensorMap);
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
      if (pkg.binary_sensor) this.addBinarySensor(...pkg.binary_sensor);
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

  public addBinarySensor(...sensors: HABinarySensor[]) {
    sensors.forEach((sensor) => {
      const name = ((sensor as HABayesianBinarySensor).name ??
        (sensor as HATrendBinarySensor).friendly_name)!;
      this.binarySensorMap[name] = sensor;
    });
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

  toJSON() {
    return toJSON.bind(this)();
  }
}
