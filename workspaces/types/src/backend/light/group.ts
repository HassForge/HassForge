import { LightID } from "../..";

export interface HALightGroup {
  platform: "group";
  /**
   * A list of entities to be included in the group.
   */
  entities: LightID[];
  /**
   * The name of the group.
   */
  name: string;
  /**
   * An ID that uniquely identifies this group. If two groups have the same unique ID,
   * Home Assistant will raise an error. Giving a group a unique ID allows the group name,
   * icon, and area to be customized via the UI.
   */
  unique_id?: string;
  /**
   * Only available for binary_sensor, light, and switch groups. Set this to true if the
   * group state should only turn on if all grouped entities are on.
   */
  all?: boolean;
}
