import {
  TemplateSensor,
  ClimateTarget,
  DEFAULT_HEAT_MODE_ATTRIBUTE,
  DEFAULT_SETPOINT_ATTRIBUTE,
  DEFAULT_TEMPERATURE_ATTRIBUTE,
} from "@hassbuilder/base";
import { sentenceCase } from "change-case";

export class RadiatorHeatNeededTemplateSensor extends TemplateSensor<ClimateTarget> {
  constructor(climate: ClimateTarget) {
    const {
      name,
      id,
      temperatureAttribute = DEFAULT_TEMPERATURE_ATTRIBUTE,
      heatModeAttribute = DEFAULT_HEAT_MODE_ATTRIBUTE,
      setpointAttribute = DEFAULT_SETPOINT_ATTRIBUTE,
    } = climate;
    super(
      {
        name: `${sentenceCase(name)} Heat Needed`,
        state: `
        {{ state_attr('${id}', '${temperatureAttribute}') < state_attr('${id}', '${setpointAttribute}') 
        and state_attr('${id}', '${heatModeAttribute}') != "off" }}`,
      },
      climate
    );
  }
}
