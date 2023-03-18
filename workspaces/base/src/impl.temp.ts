import { BoilerBuilder } from "./heating-backend";
import { RoomBuilder } from "./room-builder";

import { snakeCase } from "change-case";
import { Card } from "./types/frontend/card";
import { writeFiles } from "./utils/write-files";
import { ClimateTarget } from "./types/climate";
import { SchedulerBuilder } from "@hassbuilder/heating/src/scheduler-builder";
import { Package } from "./types/backend/package";

const mainBedroom = new RoomBuilder("Main Bedroom")
  .addTRV({
    name: "Bedroom TRV",
    climateId: "climate.tze200_6rdj8dzm_ts0601_thermostat_8",
  })
  .addTRV({
    name: "Wardrobe TRV",
    climateId: "climate.tze200_6rdj8dzm_ts0601_thermostat_9",
  })
  .addGenericThermostat({
    name: "Electric",
    heater: "switch.legrand_connected_outlet_switch_3",
    targetSensor: "sensor.tz3000_fllyghyj_ts0201_temperature",
  });

const lounge = new RoomBuilder("Lounge")
  .addTRV({
    name: "Near kitchen TRV",
    climateId: "climate.tze200_6rdj8dzm_ts0601_thermostat_5",
  })
  .addTRV({
    name: "Near windows TRV",
    climateId: "climate.tze200_6rdj8dzm_ts0601_thermostat",
  })
  .addTRV({
    name: "Corner TRV",
    climateId: "climate.tze200_6rdj8dzm_ts0601_thermostat_2",
  });

const kitchen = new RoomBuilder("Kitchen")
  .addTRV({
    name: "Sofa TRV",
    climateId: "climate.tze200_6rdj8dzm_ts0601_thermostat_6",
  })
  .addTRV({
    name: "Door TRV",
    climateId: "climate.tze200_6rdj8dzm_ts0601_thermostat_4",
  });

const tomsOffice = new RoomBuilder("Toms Office").addGenericThermostat({
  name: "Electric",
  heater: "switch.shelly_shsw_1_e89f6d86a7a1",
  targetSensor: "sensor.tze200_dwcarsat_ts0601_temperature",
});

const endBedroom = new RoomBuilder("End Bedroom").addGenericThermostat({
  name: "Electric",
  heater: "switch.0x04cf8cdf3c89dcdd",
  targetSensor: "sensor.0xa4c138bf686fe61c_temperature",
});

const spareBedroom = new RoomBuilder("Spare Bedroom").addTRV({
  climateId: "climate.tze200_6rdj8dzm_ts0601_thermostat_7",
  name: "TRV",
});

const musicRoom = new RoomBuilder("Music Room").addTRV({
  climateId: "climate.tze200_6rdj8dzm_ts0601_thermostat_3",
  name: "TRV",
});

const rooms = [
  mainBedroom,
  lounge,
  kitchen,
  tomsOffice,
  endBedroom,
  spareBedroom,
  musicRoom,
];

const schedule = new SchedulerBuilder().addRoomClimate(rooms);

const boiler = new BoilerBuilder({
  switchID: "switch.legrand_connected_outlet_switch_4",
  powerConsumptionSensorID: "sensor.legrand_connected_outlet_active_power_4",
  powerConsumptionSensorStandbyRange: [130, 200],
}).addRoomClimate(
  ...rooms.reduce<{ room: string; climate: ClimateTarget }[]>(
    (prev, room) => [
      ...prev,
      ...room.trvs.map((trv) => ({ climate: trv, room: room.name })),
    ],
    []
  )
);

writeFiles("../packages/temperature/", {
  "0_boiler": boiler.buildBackend(),
  ...rooms.reduce<{ [fileName: string]: Package }>(
    (prev, roomBuilder, i) => ({
      ...prev,
      [`${snakeCase(`${i + 1}_${roomBuilder.name}`)}`]:
        roomBuilder.buildBackend(),
    }),
    {}
  ),
});
writeFiles("../dashboards/cards/heating/rooms/", {
  "0_boiler": boiler.buildFrontend(),
  ...rooms.reduce<{ [fileName: string]: Card }>(
    (prev, roomBuilder, i) => ({
      ...prev,
      [`${snakeCase(`${i + 1}_${roomBuilder.name}`)}`]:
        roomBuilder.buildFrontend(),
    }),
    {}
  ),
});
