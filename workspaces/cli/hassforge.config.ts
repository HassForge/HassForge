import {
  Room,
  GenericThermostatClimate,
  Dashboard,
  defineConfig,
} from "@hassforge/base";
import { WithSwitchControlledThermostat } from "@hassforge/switch-controlled-thermostat";
import { WithRoomHeating } from "@hassforge/room-heating";
import {
  MotionActivatedAutomation,
  climateSchedulerCard,
} from "@hassforge/recipes";
import { MushroomDashboard } from "@hassforge/mush-room";

const wardrobe = new Room("Wardrobe")
  .addLights({
    name: "Wardrobe Lights",
    id: "switch.wardrobe_lights",
  })
  .addBinarySensors({
    name: "Wardrobe Motion",
    id: "binary_sensor.ewelink_66666_iaszone",
    device_class: "motion",
  })
  .addClimates({
    name: "Wardrobe TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat_9",
  })
  .addAutomations(
    new MotionActivatedAutomation({
      alias: "Wardrobe Motion Activated Lights",
      motionSensors: ["binary_sensor.ewelink_66666_iaszone"],
      switchEntities: ["switch.wardrobe_lights"],
      delayOff: {
        minutes: 15,
      },
    })
  )
  .extend(WithRoomHeating);

const ensuiteShower = new Room("Ensuite Shower")
  .addLights(
    {
      name: "Ensuite Shower Lights",
      id: "light.ensuite_shower_light",
      dimmable: true,
    },
    {
      name: "Ensuite Shower Mirror",
      id: "switch.bathroom_mirror",
      icon: "mdi:mirror-rectangle",
    }
  )
  .addSwitches({
    name: "Ensuite VMC",
    id: "switch.vmc",
    icon: "mdi:fan",
  });

const ensuiteToilet = new Room("Ensuite Toilet").addLights({
  name: "Ensuite Toilet Light",
  id: "light.shellydimmer2_4c752532d875",
  dimmable: true,
});

const mainBedroom = new Room("Main Bedroom")
  .addClimates({
    name: "Main Bedroom TRV",
    id: "climate.sonoff_trvzb_thermostat",
  })
  .addLights({
    name: "Main Bedroom Lights",
    id: "switch.master_bedroom",
  })
  .addSwitches({
    name: "Main Bedroom Socket",
    id: "switch.legrand_connected_outlet_switch_3",
    device_class: "outlet",
  })
  .addSensors({
    id: "sensor.tz3000_fllyghyj_ts0201_temperature",
  })
  .addClimates(
    new GenericThermostatClimate({
      name: "Main Bedroom Electric",
      heater: "switch.legrand_connected_outlet_switch_3",
      target_sensor: "sensor.tz3000_fllyghyj_ts0201_temperature",
    })
  )
  .addCameras({
    name: "Main Bedroom Camera",
    id: "camera.go2rtc_spare_cam",
  })
  .extend(WithRoomHeating);

const upstairsHallway = new Room("Upstairs Hallway")
  .addSwitches({
    id: "switch.legrand_connected_outlet_switch_5",
    name: "Upstairs Hallway Socket",
    device_class: "outlet",
  })
  .addLights({
    id: "switch.bedroom_hallway",
    name: "Upstairs Hallway Lights",
  })
  .addLights({
    id: "switch.shelly1_4c752534d8e2",
    name: "Landing Lights",
  });

const downstairsHallway = new Room("Downstairs Hallway")
  .addLights({
    id: "light.sonoff_01minizb_light",
    name: "Stairs Light",
  })
  .addLights({
    id: "switch.shellyplus1_80646fc82a04_switch_0",
    name: "Dining Room Light",
  })
  .addLights({
    id: "switch.shellyplus1_80646fc7e7c8_switch_0",
    name: "Utility Light",
  });

const downstairsBathroom = new Room("Downstairs Bathroom")
  .addClimates(
    new GenericThermostatClimate({
      name: "Downstairs Bathroom Towel Radiator",
      heater: "switch.downstairs_bathroom_towel_radiator_switch",
      target_sensor: "sensor.downstairs_bathroom_temperature_temperature",
    })
  )
  .extend(WithRoomHeating);

const lounge = new Room("Lounge")
  .addLights({
    id: "light.shellydimmer2_4c752533ae9d",
    name: "Lounge Lights",
    dimmable: true,
  })
  .addSwitches({
    id: "switch.legrand_connected_outlet_switch",
    name: "Lounge Socket",
    device_class: "outlet",
  })
  // .addClimates({
  //   name: "Near Kitchen TRV",
  //   id: "climate.tze200_6rdj8dzm_ts0601_thermostat_2",
  // })
  .addClimates({
    name: "Near Windows TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat_2",
  })
  .addClimates({
    name: "Corner TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat_5",
  })
  .addClimates({
    name: "Music Room TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat_3",
  })
  .addLights({
    id: "light.shellydimmer2_c45bbe56d5c2",
    dimmable: true,
    name: "Music Room Light",
  })
  .addSwitches({
    id: "switch.tze200_6rdj8dzm_ts0601_switch_3",
    name: "Music Room Socket",
    device_class: "outlet",
  })
  .addMediaPlayers({
    id: "media_player.lg_webos_tv_oled65cx6la",
    name: "Lounge TV",
  })
  .extend(WithRoomHeating);

const kitchen = new Room("Kitchen")
  .addLights(
    {
      name: "Kitchen Pendant",
      id: "switch.kitchen_pendant",
    },
    {
      name: "Kitchen Spots",
      id: "switch.kitchen_spots",
    },
    {
      name: "Kitchen Under Counter",
      id: "switch.under_counter_leds",
    },
    {
      name: "Kitchen Over Counter",
      id: "switch.over_counter_leds",
    }
  )
  .addClimates({
    name: "Kitchen Bifolds TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat_6",
  })
  .addClimates({
    name: "Kitchen Veranda TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat_4",
  })
  .extend(WithRoomHeating);

const outsideBack = new Room("Back").addLights({
  name: "Patio Lights",
  id: "switch.bifold_lights",
});

const outsideFront = new Room("Front")
  .addLights(
    {
      name: "Front Wall Lights",
      id: "switch.front_lights",
    },
    {
      name: "Front Floodlight",
      id: "switch.floodlight",
    }
  )
  .addCameras({
    name: "Front Garden Camera",
    id: "camera.go2rtc_front_garden",
  });

const tomsOffice = new Room("Toms Office")
  .addSensors({
    id: "sensor.toms_office_temperature",
    name: "Toms Office NSPanel Temperature",
  })
  .addClimates(
    new GenericThermostatClimate({
      name: "Toms Office Electric",
      heater: "switch.heated",
      target_sensor: "sensor.tze200_dwcarsat_ts0601_temperature",
    })
  )
  .addLights({
    name: "Toms Office Lights",
    id: "switch.toms_office_relay_1",
  })
  .extend(WithRoomHeating);

const endBedroom = new Room("End Bedroom")
  .addClimates(
    new GenericThermostatClimate({
      name: "End Bedroom Electric",
      heater: "switch.end_bedroom_plug_switch_2",
      target_sensor: "sensor.end_bedroom_temperature_temperature_2",
    })
  )
  .extend(WithRoomHeating);

const spareBedroom = new Room("Talis Bedroom")
  .addLights({
    id: "switch.spare_bed_lights",
    name: "Talis Bedroom Light",
  })
  .addClimates({
    name: "Talis Bedroom TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat_7",
  })
  .addCameras({
    name: "Talis Bedroom Camera",
    id: "camera.go2rtc_tali_room",
  })
  .extend(WithRoomHeating);

const boilerSwitch = {
  name: "Boiler switch",
  id: "switch.legrand_connected_outlet_switch_4",
} as const;

const boilerPowerConsumptionSensor = {
  name: "Boiler power consumption",
  id: "sensor.legrand_connected_outlet_active_power_4",
} as const;

const roomsWithHeating = [
  mainBedroom,
  wardrobe,
  endBedroom,
  spareBedroom,
  downstairsBathroom,
  lounge,
  kitchen,
  tomsOffice,
];

const boilerRoom = new Room("Boiler Room").extend(
  WithSwitchControlledThermostat,
  {
    boilerOptions: {
      haSwitch: boilerSwitch,
      powerConsumptionSensor: boilerPowerConsumptionSensor,
      powerConsumptionStandbyRange: [130, 200],
    },
    rooms: roomsWithHeating,
    includeClimate: (_, climate) =>
      climate.id.includes("ts0601") || climate.id.includes("sonoff_trvzb"),
  }
);

const _1_home = new MushroomDashboard("Home").addRooms(
  lounge,
  kitchen,
  mainBedroom,
  wardrobe,
  ensuiteShower,
  ensuiteToilet,
  upstairsHallway,
  downstairsHallway,
  downstairsBathroom,
  outsideBack,
  outsideFront,
  tomsOffice,
  endBedroom,
  spareBedroom,
  boilerRoom
);

const _2_heatingDashboard = new Dashboard("Heating")
  .addCard(climateSchedulerCard(roomsWithHeating))
  .addCard(boilerRoom.extensions.switchControlledThermostat.card())
  .addCards(
    roomsWithHeating.map((heating) => heating.extensions.roomHeating.card())
  );

export default defineConfig({
  rooms: {
    wardrobe,
    ensuiteShower,
    ensuiteToilet,
    mainBedroom,
    upstairsHallway,
    downstairsHallway,
    downstairsBathroom,
    lounge,
    kitchen,
    outsideBack,
    outsideFront,
    tomsOffice,
    endBedroom,
    spareBedroom,
    boilerRoom,
  },
  dashboards: {
    _1_home,
    _2_heatingDashboard,
  },
});
