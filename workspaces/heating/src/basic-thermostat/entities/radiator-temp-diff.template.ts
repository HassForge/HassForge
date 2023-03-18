import { TemplateSensor, ClimateTarget } from "@hassbuilder/base";
import { sentenceCase } from "change-case";

export class RadiatorTempDiffTemplateSensor extends TemplateSensor<ClimateTarget> {
  constructor(climate: ClimateTarget) {
    const { name, id, temperatureAttribute = "current_temperature", setpointAttribute = "temperature" } = climate;
    super(
      {
        name: `${sentenceCase(name)} Temp Diff`,
        state: `{{ state_attr('${id}', '${temperatureAttribute}') - state_attr('${id}', '${setpointAttribute}') | float }}`,
      },
      climate
    );
  }
}
