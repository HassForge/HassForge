import { snakeCase, sentenceCase } from "change-case";
import {
  generateAverageTemperatureTemplateSensor,
  generateDesiredTemperatureTemplateSensor,
} from "./generators";
import { Package } from "./types";
import { Climate, ClimateTarget } from "./types/climate";
import { CustomizeDictionary } from "./types/homeassistant";

interface GenericThermostat {
  name: string;
  climateIdOverride?: string;
  heater: string;
  targetSensor: string;
}

export interface Room {
  name: string;
  climates: ClimateTarget[];
}

export class RoomBuilder {
  name: string;
  genericThermostats: GenericThermostat[] = [];
  climates: ClimateTarget[] = [];

  constructor(name: string) {
    this.name = name;
  }

  private getClimateId(name: string) {
    return `climate.${snakeCase(this.name)}_${snakeCase(name)}`;
  }

  addClimate(climate: ClimateTarget) {
    this.climates.push(climate);
    return this;
  }

  addTRV(
    climate: Omit<
      ClimateTarget,
      "heatModeAttribute" | "temperatureAttribute" | "setpointAttribute"
    >
  ) {
    return this.addClimate({
      ...climate,
      heatModeAttribute: "system_mode",
      temperatureAttribute: "local_temperature",
      setpointAttribute: "current_heating_setpoint",
    });
  }

  addGenericThermostat(thermostat: GenericThermostat) {
    this.genericThermostats.push(thermostat);
    return this.addClimate({
      name: thermostat.name,
      climateId:
        thermostat.climateIdOverride ?? this.getClimateId(thermostat.name),
      heatModeAttribute: "hvac_action",
      setpointAttribute: "temperature",
      temperatureAttribute: "current_temperature",
    });
  }

  buildBackend(): Package {
    const averageTemperatureSensor = generateAverageTemperatureTemplateSensor(
      this.name,
      this.climates
    );
    const desiredTemperatureSensors = this.climates.map(
      generateDesiredTemperatureTemplateSensor
    );
    const friendlyNames = this.climates.reduce(
      (prev, { climateId, name }) => ({
        ...prev,
        [climateId]: { friendly_name: sentenceCase(`${this.name} ${name}`) },
      }),
      {} as CustomizeDictionary
    );
    return {
      homeassistant: {
        customize: {
          ...friendlyNames,
        },
      },
      template: [
        {
          sensor: [averageTemperatureSensor, ...desiredTemperatureSensors],
        },
      ],
      climate: this.genericThermostats.map<Climate>((thermostat) => ({
        platform: "generic_thermostat",
        unique_id: `${snakeCase(this.name)}_${snakeCase(thermostat.name)}`,
        name: `${sentenceCase(`${this.name} ${thermostat.name}`)}`,
        heater: thermostat.heater,
        target_sensor: thermostat.targetSensor,
        ac_mode: false,
        min_temp: 10,
        max_temp: 25,
        target_temp: 21,
      })),
    };
  }
}
