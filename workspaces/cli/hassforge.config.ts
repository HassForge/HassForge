import {
  Room,
  GenericThermostatClimate,
  Dashboard,
  defineConfig,
  Condition,
  Automation,
  Trigger,
  Action,
  InputDateTime,
} from "@hassforge/base";
import { WithSwitchControlledThermostat } from "@hassforge/switch-controlled-thermostat";
import { WithRoomHeating } from "@hassforge/room-heating";
import {
  MotionActivatedAutomation,
  climateSchedulerCard,
} from "@hassforge/recipes";
import { MushroomDashboard, roomToMushroom } from "@hassforge/mush-room";
import { WithWebOSTV } from "@hassforge/webostv";
import { MushroomEntityCard } from "@hassforge/mush-room/src/cards/mushroom-entity-card";

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
        minutes: 5,
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
  id: "light.main_bedroom_ensuite_toilet",
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
    name: "Main Bedroom Temperature Sensor",
    device_class: "temperature",
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
  .addMediaPlayers({
    name: "Main Bedroom TV",
    id: "media_player.samsung_7_series_49",
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
  })
  .addAutomations(
    new MotionActivatedAutomation({
      motionSensors: [
        "binary_sensor.hall_kitchen_door_motion",
        "binary_sensor.motion_sensor_hall_stairs_side_motion",
      ],
      switchEntities: [
        "switch.shellyplus1_80646fc7e7c8_switch_0",
        "switch.shellyplus1_80646fc82a04_switch_0",
      ],
      alias: "Downstairs Hallway/Dining Room Motion Activated Light",
      delayOff: {
        minutes: 5,
      },
      onConditions: [
        Condition.or(
          Condition.sun({
            before: "sunrise",
          }),
          Condition.sun({
            after: "sunset",
            after_offset: "-01:00:00",
          })
        ),
      ],
    })
  )
  .addAutomations(
    new MotionActivatedAutomation({
      alias: "Downstairs Hallway/Bottom of Stairs Motion Activated Light",
      motionSensors: ["binary_sensor.motion_sensor_downstairs_office_motion"],
      switchEntities: ["light.sonoff_01minizb_light"],
      delayOff: {
        minutes: 5,
      },
      onConditions: [
        Condition.or(
          Condition.sun({
            before: "sunrise",
          }),
          Condition.sun({
            after: "sunset",
            after_offset: "-01:00:00",
          })
        ),
      ],
    })
  );

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
    name: "Near Kitchen TRV",
    id: "climate.sonoff_trvzb_thermostat_2",
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
  .addTemperatureSensors({
    id: 'sensor.temp_sensor_9ee_temperature',
    name: 'Above Painting Temp Sensor'
  })
  .addSwitches({
    id: "switch.tze200_6rdj8dzm_ts0601_switch_3",
    name: "Music Room Socket",
    device_class: "outlet",
  })
  // .addMediaPlayers(new UniversalMediaPlayer({ name: "Lounge TV",/ }))
  .extend(WithRoomHeating)
  .extend(WithWebOSTV, {
    macAddress: "58:FD:B1:EC:0B:B4",
    mediaPlayerTarget: {
      id: "media_player.lg_webos_tv_oled65cx6la",
      name: "Lounge TV",
    },
  });

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
  .addTemperatureSensors({
    id: 'sensor.temp_sensor_a1f_temperature',
    name: 'Counter Temperature'
  })
  .addSwitches({
    id: "switch.switch_00a_switch",
    name: "Christmas Tree Lights",
  })
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
    device_class: "temperature",
  })
  .addAutomations(
    new Automation({
      alias: "Toms Office NSPanel Climate Toggle",
      trigger: [
        Trigger.state(
          "binary_sensor.nspanel_toms_office_toms_office_right_button",
          {
            from: "off",
            to: "on",
          }
        ),
      ],
      action: [Action.toggle("climate.toms_office_electric")],
    })
  )
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
      heater: "switch.switch_7bf_switch_2",
      target_sensor: "sensor.temp_sensor_7b2_temperature_4",
    })
  )
  .extend(WithRoomHeating);

const spareBedroom = new Room("Spare Bedroom")
  .addClimates(
    new GenericThermostatClimate({
      name: "Spare Bedroom Electric",
      heater: "switch.switch_92e_switch_2",
      target_sensor: "sensor.temp_sensor_667_temperature_3",
    })
  )
  .extend(WithRoomHeating);

const datePressedInputBoolean = new InputDateTime({
  name: "Tali Room Date Time Pressed",
  has_date: true,
  has_time: true,
});
const talisBedroom = new Room("Talis Bedroom")
  .addLights({
    id: "switch.spare_bed_lights",
    name: "Talis Bedroom Light",
  })
  .addClimates(
    {
      name: "Talis Bedroom TRV",
      id: "climate.tze200_6rdj8dzm_ts0601_thermostat_7",
    },
    new GenericThermostatClimate({
      name: "Talis Bedroom Electric",
      heater: "switch.lumi_lumi_plug_maeu01_switch_2",
      target_sensor: "sensor.tali_room_temperature_sensor_temperature_4",
    })
  )
  .addInputDateTime(datePressedInputBoolean)
  .addAutomations({
    alias: "On Tali Room Button Press",
    trigger: [
      Trigger.event("zha_event", {
        event_data: {
          device_ieee: "00:12:4b:00:1f:45:16:f5",
        },
      }),
    ],
    action: [
      Action.callService("input_datetime.set_datetime", {
        target: {
          entity_id: datePressedInputBoolean.id,
        },
        data: {
          timestamp: "{{ now().timestamp() }}",
        },
      }),
      Action.delay({
        seconds: 5,
      }),
    ],
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
  talisBedroom,
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

const _1_home = new MushroomDashboard("Home");

const allRooms = [
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
  talisBedroom,
  boilerRoom,
];

const turnAllOffAutomation = new Automation({
  alias: "Turn off whole house",
  action: [
    ...tomsOffice.climates.map((climate) => climate.id).map(Action.turnOff),
    Action.parallel(
      ...allRooms
        .flatMap((room) => [
          ...room.lights.map(({ id }) => id),
          ...room.switches.map(({ id }) => id),
          ...room.mediaPlayers.map(({ id }) => id),
        ])
        .map(Action.turnOff)
    ),
  ],
  trigger: [Trigger.time("05:00:00")],
});

const wholeHouse = new Room("Whole House").addAutomations(turnAllOffAutomation);

const turnAllOffCard: MushroomEntityCard = {
  entity: turnAllOffAutomation.id,
  type: "custom:mushroom-entity-card",
};

const talisBedroomCard = roomToMushroom(talisBedroom, {
  chips: [
    {
      type: "entity",
      entity: datePressedInputBoolean.id,
      icon: "mdi:sleep",
    },
  ],
});

_1_home
  .addCard(turnAllOffCard)
  .addRooms(...allRooms.filter((room) => room !== talisBedroom))
  .addCard(talisBedroomCard);

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
    talisBedroom,
    boilerRoom,
    wholeHouse,
  },
  dashboards: {
    _1_home,
    _2_heatingDashboard,
  },
});
