import {
  TemplateSensor,
  SensorTarget,
  toJinjaArrayLiteral,
} from "@hassforge/base";

export class TotalRadiatorsHeatRequestedSensor extends TemplateSensor<
  SensorTarget[]
> {
  constructor(climates: SensorTarget[]) {
    super(
      {
        name: "Radiators Requesting Heat",
        state: `{{ ${toJinjaArrayLiteral(
          climates.map(({ id }) => id)
        )} | select('is_state', 'True') | list | length }}`,
      },
      climates
    );
  }
}
