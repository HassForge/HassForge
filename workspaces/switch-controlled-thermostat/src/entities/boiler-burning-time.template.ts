import { Sensor, SensorTarget } from "@hassforge/base";

export class BoilerBurningTimeSensor extends Sensor {
  constructor({ id }: SensorTarget) {
    super({
      platform: "history_stats",
      name: "Boiler burning today",
      entity_id: id,
      state: "on",
      type: "time",
      start:
        "{{ now().replace(day=now().day-1, month=now().month, hour=now().hour, minute=now().minute, second=now().second, microsecond=0) }}",
      end: "{{ now() }}",
    });
  }
}
