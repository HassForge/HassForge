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
  HATrendBinarySensorMap,
} from "@hassforge/types";
import { omit } from ".";

export class HassBuilderPackage implements HAPackage {
  climateMap: { [key: string]: HAClimate } = {};
  templateMap: { [key: string]: HATemplateSensor } = {};
  sensorMap: { [key: string]: HASensor } = {};
  binarySensorMap: { [key: string]: HABinarySensor } = {};
  trendSensorMap: HATrendBinarySensorMap = {};
  customize: HACustomizeDictionary = {};
  automationMap: { [key: string]: HAAutomation } = {};

  toJSON() {
    return omit(
      this,
      "climateMap",
      "templateMap",
      "sensorMap",
      "binarySensorMap",
      'trendSensorMap',
      'customize',
      "automationMap",
    );
  }

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
    const trendSensors: HATrendBinarySensor = {
      platform: "trend",
      sensors: this.trendSensorMap,
    };
    return [...Object.values(this.binarySensorMap), trendSensors];
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
      if ((sensor as HABayesianBinarySensor).name) {
        this.binarySensorMap[(sensor as HABayesianBinarySensor).name] = sensor;
      } else if ((sensor as HATrendBinarySensor).sensors) {
        this.trendSensorMap = {
          ...this.trendSensorMap,
          ...(sensor as HATrendBinarySensor).sensors,
        };
      }
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

}
