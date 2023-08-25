import { SensorTarget, SwitchTarget } from "@hassbuilder/base";
import { HAPackage } from "@hassbuilder/types";
import { TurnOffSwitchBinarySensorAutomation } from "./automation/turn-off-switch-automation";
import { TurnOnSwitchBinarySensorAutomation } from "./automation/turn-on-switch-automation";
import { HumidityTrendSensor } from "./entities/humidity-trend.sensor";
import { formatDistanceStrict } from "date-fns";

export interface HassHumidityTrendSwitchOption {
  sensorTarget: SensorTarget;
  switchTarget: SwitchTarget;
  name: string;
  changePercent?: number;
  timeSeconds?: number;
  sampleCount?: number;
}

export class HassHumidityTrendSwitch implements HAPackage {
  sensorTarget: SensorTarget;
  switchTarget: SwitchTarget;
  humidityTrendSensor: HumidityTrendSensor;
  turnOnSwitchAutomation: TurnOnSwitchBinarySensorAutomation;
  turnOffSwitchAutomation: TurnOffSwitchBinarySensorAutomation;

  constructor({
    name,
    sensorTarget,
    switchTarget,
    changePercent = 3,
    sampleCount = 3,
    timeSeconds = 60,
  }: HassHumidityTrendSwitchOption) {
    this.sensorTarget = sensorTarget;
    this.switchTarget = switchTarget;
    const sensorName = `${name} trend`;
    this.humidityTrendSensor = new HumidityTrendSensor({
      changePercent,
      name: sensorName,
      sampleCount, 
      target: sensorTarget,
      timeSeconds,
    });
    const distance = formatDistanceStrict(0, timeSeconds * 1000);
    const description = `humidity ${
      changePercent < 0 ? "decreases" : "increases"
    } by ${changePercent}% over ${distance}`;
    this.turnOffSwitchAutomation = new TurnOffSwitchBinarySensorAutomation(
      `Turn on ${switchTarget.name ?? ""} when '${sensorName}' is on`,
      this.humidityTrendSensor,
      switchTarget,
      description
    );
    this.turnOnSwitchAutomation = new TurnOnSwitchBinarySensorAutomation(
      `Turn off ${switchTarget.name ?? ""} when '${sensorName}' is off`,
      this.humidityTrendSensor,
      switchTarget,
      description
    );
  }

  get binary_sensor() {
    return [this.humidityTrendSensor];
  }

  get automation() {
    return [this.turnOnSwitchAutomation, this.turnOffSwitchAutomation];
  }
}
