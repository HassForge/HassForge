import { CreatableEntity } from "./entity";
import { HAGenericThermostat } from "@hassbuilder/types";
import { ClimateTarget } from "../configuration";

export type GenericThermostatInput = PartialBy<
  Omit<HAGenericThermostat, "platform">,
  "ac_mode" | "max_temp" | "min_temp" | "target_temp"
>;

export class GenericThermostatClimate
  extends CreatableEntity<"climate", HAGenericThermostat>
  implements HAGenericThermostat, ClimateTarget
{
  constructor(entity: GenericThermostatInput) {
    const fullEntity: HAGenericThermostat = {
      ...entity,
      platform: "generic_thermostat",
      ac_mode: entity.ac_mode ?? false,
      min_temp: entity.min_temp ?? 10,
      max_temp: entity.max_temp ?? 25,
      target_temp: entity.target_temp ?? 21,
    };
    super("climate", fullEntity);
    Object.assign(this, fullEntity);
  }

  platform!: "generic_thermostat";
  unique_id!: string;
  name!: string;
  heater!: string;
  target_sensor!: `sensor.${string}`;
  ac_mode!: boolean;
  min_temp!: number;
  max_temp!: number;
  target_temp!: number;
}
