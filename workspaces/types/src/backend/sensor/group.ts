import { SensorID } from "../..";

/**
 * A group of entities in Home Assistant.
 */
export interface HASensorGroup {
  platform: "group";
  /**
   * A list of entities to be included in the group.
   */
  entities: SensorID[];
  /**
   * The name of the group.
   */
  name?: string;
  /**
   * An ID that uniquely identifies this group. If two groups have the same unique ID,
   * Home Assistant will raise an error. Giving a group a unique ID allows the group name,
   * icon, and area to be customized via the UI.
   */
  unique_id?: string;

  /**
   * The type of sensor: min, max, last, mean, median,
   * range, product, or sum.
   */
  type?:
    | "min"
    | "max"
    | "last"
    | "mean"
    | "median"
    | "range"
    | "product"
    | "sum";

  /**
   * Set this to true if the group state should ignore
   * sensors with non-numeric values.
   */
  ignore_non_numeric?: boolean;
  /**
   * Set the unit of measurement for the sensor.
   */
  unit_of_measurement?: string;
  /**
   * Set the device class for the sensor according to
   * available options.
   */
  device_class?: string;
  /**
   * Set the state class for the sensor according to
   * available options.
   */
  state_class?: string;
}
