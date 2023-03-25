import {
  Room,
  GenericThermostatClimate,
  HassBuilderPackage,
} from "@hassbuilder/base";
import {
  HassBasicThermostatPackage,
  HassHumidityTrendSwitch,
  HassRoomHeating,
} from "@hassbuilder/packages";
import { writeFiles } from "./write-files";

const mainBedroom = new Room("Main Bedroom")
  .addClimate({
    name: "Main bedroom TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat_8",
  })
  .addClimate({
    name: "Wardrobe TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat_9",
  })
  .addClimate(
    new GenericThermostatClimate({
      name: "Main bedroom electric",
      heater: "switch.legrand_connected_outlet_switch_3",
      target_sensor: "sensor.tz3000_fllyghyj_ts0201_temperature",
    })
  );

const lounge = new Room("Lounge")
  .addClimate({
    name: "Lounge near kitchen TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat_5",
  })
  .addClimate({
    name: "Lounge near windows TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat",
  })
  .addClimate({
    name: "Lounge corner TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat_2",
  });

const kitchen = new Room("Kitchen")
  .addClimate({
    name: "Kitchen sofa TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat_6",
  })
  .addClimate({
    name: "Kitchen door TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat_4",
  });

const tomsOffice = new Room("Toms Office").addClimate(
  new GenericThermostatClimate({
    name: "Toms office electric",
    heater: "switch.shelly_shsw_1_e89f6d86a7a1",
    target_sensor: "sensor.tze200_dwcarsat_ts0601_temperature",
  })
);

const endBedroom = new Room("End Bedroom").addClimate(
  new GenericThermostatClimate({
    name: "End bedroom electric",
    heater: "switch.0x04cf8cdf3c89dcdd",
    target_sensor: "sensor.0xa4c138bf686fe61c_temperature",
  })
);

const spareBedroom = new Room("Spare Bedroom").addClimate({
  name: "Spare bedroom TRV",
  id: "climate.tze200_6rdj8dzm_ts0601_thermostat_7",
});

const musicRoom = new Room("Music Room").addClimate({
  name: "Music room TRV",
  id: "climate.tze200_6rdj8dzm_ts0601_thermostat_3",
});

const boilerSwitch = {
  name: "Boiler switch",
  id: "switch.legrand_connected_outlet_switch_4",
} as const;

const boilerPowerConsumptionSensor = {
  name: "Boiler power consumption",
  id: "sensor.legrand_connected_outlet_active_power_4",
} as const;

const boilerRoom = new Room("Boiler Room").addSwitches(boilerSwitch);

const rooms = [
  mainBedroom,
  lounge,
  kitchen,
  tomsOffice,
  endBedroom,
  spareBedroom,
  musicRoom,
];

const ensuiteShowering = new HassHumidityTrendSwitch({
  name: "showering",
  sensorTarget: {
    id: "sensor.tz3000_fllyghyj_ts0201_humidity_2",
    name: "Ensuite Humidity Sensor",
  },
  switchTarget: {
    id: "switch.shelly_shellypro4pm_84cca87f95dc_4",
    name: "Ensuite VMC",
  },
});

const basicThermostatPkg = new HassBasicThermostatPackage({
  boiler: {
    haSwitch: boilerSwitch,
    powerConsumptionSensor: boilerPowerConsumptionSensor,
    powerConsumptionStandbyRange: [130, 200],
  },
  trvs: rooms
    .flatMap((room) => room.climates)
    .filter((climate) => climate.id.includes("ts0601")),
});

const heating = rooms.map((room) => new HassRoomHeating(room));

const pkg = new HassBuilderPackage().mergePackage(
  ...rooms,
  boilerRoom,
  ...heating,
  basicThermostatPkg,
  ensuiteShowering
);

const dashboard = [
  basicThermostatPkg.card(),
  ...heating.map((heating) => heating.card()),
];

console.log(JSON.stringify(pkg, null, 4));
console.log(JSON.stringify(dashboard, null, 4));

writeFiles("./out", {
    backend: pkg
});
// writeFiles("../dashboards/cards/heating/rooms/", {
//   "0_boiler": boiler.buildFrontend(),
//   ...rooms.reduce<{ [fileName: string]: Card }>(
//     (prev, roomBuilder, i) => ({
//       ...prev,
//       [`${snakeCase(`${i + 1}_${roomBuilder.name}`)}`]:
//         roomBuilder.buildFrontend(),
//     }),
//     {}
//   ),
// });
