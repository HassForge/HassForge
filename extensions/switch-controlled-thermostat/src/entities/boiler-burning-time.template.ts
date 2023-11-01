import { SensorTarget, HistoryStatsSensor } from "@hassforge/base";

export class BoilerBurningTimeSensor extends HistoryStatsSensor {
  constructor({ id }: SensorTarget) {
    super({
      name: "Boiler burning today",
      entity_id: id,
      state: "on",
      type: "time",
      end: "{{ now() }}",
      duration: {
        hours: 24,
      },
    });
  }
}
