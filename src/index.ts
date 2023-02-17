import { BoilerBuilder } from "./boiler-builder";
import { RoomBuilder } from "./room-builder";

import { Package } from "./types";
import { snakeCase } from "change-case";
import { Card } from "./types/frontend";
import { writeFiles } from "./utils/write-files";
import { ClimateTarget } from "./types/climate";

const mainBedroom = new RoomBuilder("Main Bedroom")
  .addTRV({
    name: "Bedroom TRV",
    climateId: "climate.0xa4c138a26993e5e1",
  })
  .addTRV({
    name: "Wardrobe TRV",
    climateId: "climate.0xa4c138105b3d9398",
  })
  .addGenericThermostat({
    name: "Electric",
    heater: "switch.0x000474000009edc2",
    targetSensor: "sensor.0xa4c13850c63b787e_temperature",
  });

const lounge = new RoomBuilder("Lounge")
  .addTRV({
    name: "Near kitchen TRV",
    climateId: "climate.0xa4c138cbb0075703",
  })
  .addTRV({
    name: "Near windows TRV",
    climateId: "climate.0xa4c1380f35e39620",
  })
  .addTRV({
    name: "Corner TRV",
    climateId: "climate.0xa4c138bb1f4f3ae4",
  });

const kitchen = new RoomBuilder("Kitchen")
  .addTRV({
    name: "Sofa TRV",
    climateId: "climate.0xa4c13886f09c422c",
  })
  .addTRV({
    name: "Door TRV",
    climateId: "climate.0xa4c138527e6954d7",
  });

const tomsOffice = new RoomBuilder("Toms Office").addGenericThermostat({
  name: "Electric",
  heater: "switch.shelly_shsw_1_e89f6d86a7a1",
  targetSensor: "sensor.0xa4c1385befd737e3_temperature",
});

const endBedroom = new RoomBuilder("End Bedroom").addGenericThermostat({
  name: "Electric",
  heater: "switch.0x04cf8cdf3c89dcdd",
  targetSensor: "sensor.0xa4c138bf686fe61c_temperature",
});

const spareBedroom = new RoomBuilder("Spare Bedroom")
  .addGenericThermostat({
    name: "Electric",
    heater: "switch.0x7cb03eaa0a085bbe",
    targetSensor: "sensor.0xa4c138744d5c67c3_temperature",
  })
  .addTRV({ climateId: "climate.0xa4c138c11ef4092f", name: "TRV" });

const musicRoom = new RoomBuilder("Music Room").addTRV({
  climateId: "climate.0xa4c1384a0d461833",
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

const boiler = new BoilerBuilder({
  switchID: "switch.0x000474000009ebe5",
  powerConsumptionSensorID: "sensor.0x000474000009ebe5_power",
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
