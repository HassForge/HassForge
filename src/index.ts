import { HassBuilder } from "./builder";
import { RoomBuilder } from "./room-builder";

const mainBedroom = new RoomBuilder("Main Bedroom")
  .addTRV({
    name: "TRV",
    climateId: "climate.0xa4c138a26993e5e1",
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

const spareBedrom = new RoomBuilder("Spare Bedroom")
  .addGenericThermostat({
    name: "Electric",
    heater: "switch.0x7cb03eaa0a085bbe",
    targetSensor: "sensor.0xa4c138744d5c67c3_temperature",
  })
  .addTRV({ climateId: "climate.0xa4c138c11ef4092f", name: "TRV" });

new HassBuilder()
  .addRoomBuilder(mainBedroom)
  .addRoomBuilder(lounge)
  .addRoomBuilder(kitchen)
  .addRoomBuilder(tomsOffice)
  .addRoomBuilder(endBedroom)
  .addRoomBuilder(spareBedrom)
  .writePackages("./dist");
