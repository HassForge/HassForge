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
  InputText,
  DEFAULT_HEAT_MODE_ATTRIBUTE,
  TemplateSensor,
  InputNumber,
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
import {
  EntityRowCard,
  MiniGraphCard,
  VerticalStackInCard,
} from "@hassforge/types";
import { UtilityMeter } from "@hassforge/base/src/creatables/utility-meter";

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
    id: "climate.tze200_6rdj8dzm_ts0601_5",
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
  .addCameras({
    name: "Main Bedroom Camera",
    id: "camera.go2rtc_spare_cam",
  })
  .addMediaPlayers({
    name: "Main Bedroom TV",
    id: "media_player.samsung_7_series_49",
  })
  .addAutomations({
    alias:
      "When Main bedroom light is turned off, turn off wardrobe and bathrooms",
    condition: [
      Condition.sun({
        after: "sunrise",
        after_offset: "+01:00:00",
      }),
      Condition.sun({
        before: "sunset",
        before_offset: "-01:00:00",
      }),
    ],
    trigger: [
      Trigger.state("switch.master_bedroom", {
        to: "off",
      }),
    ],
    action: [
      Action.parallel(
        ...[
          wardrobe.lights,
          wardrobe.switches,
          ensuiteShower.lights,
          ensuiteToilet.lights,
          ensuiteShower.switches,
          ensuiteToilet.switches,
        ]
          .flat()
          .map(({ id }) => id)
          .map(Action.turnOff)
      ),
    ],
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

const diningRoom = new Room("Dining Room")
  .addClimates({
    name: "Hallway TRV",
    id: "climate.hallway_radiator_thermostat",
  })
  .addClimates({
    name: "Window TRV",
    id: "climate.window_radiator_thermostat",
  })
  .extend(WithRoomHeating);

const downstairsHallway = new Room("Downstairs Hallway")
  .addLights({
    id: "light.sonoff_01minizb_light",
    name: "Stairs Light",
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
    id: "climate.tze200_6rdj8dzm_ts0601_6",
  })
  .addClimates({
    name: "Corner TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_8",
  })
  .addClimates({
    name: "Near Kitchen TRV",
    id: "climate.sonoff_trvzb_thermostat_2",
  })
  .addClimates({
    name: "Music Room TRV",
    id: "climate.tze200_6rdj8dzm_ts0601",
  })
  .addLights({
    id: "light.shellydimmer2_c45bbe56d5c2",
    dimmable: true,
    name: "Music Room Light",
  })
  .addTemperatureSensors({
    id: "sensor.temp_sensor_9ee_temperature",
    name: "Above Painting Temp Sensor",
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
    id: "sensor.temp_sensor_a1f_temperature",
    name: "Counter Temperature",
  })
  .addSwitches({
    id: "switch.switch_00a_switch",
    name: "Christmas Tree Lights",
  })
  .addClimates({
    name: "Kitchen Bifolds TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_3",
  })
  .addClimates({
    name: "Kitchen Veranda TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_2",
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
  .addLights({
    name: "Toms Office Lights",
    id: "switch.toms_office_relay_1",
  })
  .extend(WithRoomHeating);

const endBedroom = new Room("End Bedroom").extend(WithRoomHeating);

const datePressedInputBoolean = new InputDateTime({
  name: "Tali Room Date Time Pressed",
  has_date: true,
  has_time: true,
});

const miasBedroom = new Room("Mias Bedroom")
  .addLights({
    id: "switch.spare_bed_lights",
    name: "Mia Bedroom Light",
  })
  .addCameras({
    name: "Mia Bedroom Camera",
    id: "camera.go2rtc_mia_room",
  })
  .addClimates({
    name: "Mia Bedroom TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_4",
  })
  .addInputDateTime(datePressedInputBoolean)
  // .addAutomations({
  //   alias: "On Tali Room Button Press",
  //   trigger: [
  //     Trigger.event("zha_event", {
  //       event_data: {
  //         device_ieee: "00:12:4b:00:1f:45:16:f5",
  //       },
  //     }),
  //   ],
  //   action: [
  //     Action.callService("input_datetime.set_datetime", {
  //       target: {
  //         entity_id: datePressedInputBoolean.id,
  //       },
  //       data: {
  //         timestamp: "{{ now().timestamp() }}",
  //       },
  //     }),
  //     Action.delay({
  //       seconds: 5,
  //     }),
  //   ],
  // })
  .extend(WithRoomHeating);

const talisBedroom = new Room("Talis Bedroom")

  .addCameras({
    name: "Talis Bedroom Camera",
    id: "camera.go2rtc_tali_room",
  })
  .addTemperatureSensors({
    name: "Talis Bedroom Temperature",
    id: "sensor.temp_sensor_667_temperature_3",
  })
  .addClimates({
    name: "Talis Bedroom TRV",
    id: "climate.radiator_thermostat",
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
  miasBedroom,
  diningRoom,
  downstairsBathroom,
  lounge,
  kitchen,
  tomsOffice,
];

const heatPumpDailyKwhSensorId =
  "sensor.altherma_climatecontrol_heating_daily_electrical_consumption";

const electricityCost = new InputNumber({
  name: "Electricity Price",
  min: 0.1,
  max: 0.5,
  step: 0.001,
  initial: 0.1906,
  unit_of_measurement: "EUR/kWh",
});

const dailyElectricityCost =
  new (class DailyElectricityPriceSensor extends TemplateSensor {
    constructor() {
      super({
        name: "Daily Heat Pump Electricity Price",
        unit_of_measurement: "€",
        state: `{{ states('${heatPumpDailyKwhSensorId}') | float * states('${electricityCost.id}') | float | round(2) }}`,
      });
    }
  })();

const heatPumpMonthlyUtilityMeter = new UtilityMeter({
  source: heatPumpDailyKwhSensorId,
  always_available: true,
  cycle: "monthly",
  name: "Monthly Heat Pump Electricity",
  periodically_resetting: true,
});

const monthlyElectricityCost =
  new (class MonthlyElectricityPriceSensor extends TemplateSensor {
    constructor() {
      super({
        name: "Monthly Heat Pump Electricity Price",
        unit_of_measurement: "€",
        state: `{{ states('${heatPumpDailyKwhSensorId}') | float * states('${heatPumpMonthlyUtilityMeter.id}') | float | round(2) }}`,
      });
    }
  })();

const boilerRoom = new Room("Boiler Room")
  .addInputNumber(electricityCost)
  .addSensors(
    dailyElectricityCost,
    heatPumpMonthlyUtilityMeter,
    monthlyElectricityCost
  )
  .addAutomations(
    new Automation({
      alias: "Turn off Heat pump when all rads are off",
      condition: [
        Condition.and(
          ...roomsWithHeating
            .flatMap((room) => room.climates)
            .filter(
              (climate) =>
                climate.id.includes("ts0601") ||
                climate.id.includes("sonoff_trvzb")
            )
            .map((climate) =>
              Condition.state(climate.id, {
                attribute:
                  DEFAULT_HEAT_MODE_ATTRIBUTE ?? climate.heatModeAttribute,
                state: "off",
              })
            )
        ),
      ],
      action: [Action.turnOff("climate.altherma_leaving_water_offset")],
      trigger: [Trigger.timePattern({ minutes: "/15" })],
    }),
    new Automation({
      alias: "Turn on Heat pump when at least 1 rad is on",
      condition: [
        Condition.or(
          ...roomsWithHeating
            .flatMap((room) => room.climates)
            .filter(
              (climate) =>
                climate.id.includes("ts0601") ||
                climate.id.includes("sonoff_trvzb")
            )
            .map((climate) =>
              Condition.state(climate.id, {
                attribute:
                  DEFAULT_HEAT_MODE_ATTRIBUTE ?? climate.heatModeAttribute,
                state: "on",
              })
            )
        ),
      ],
      action: [Action.turnOn("climate.altherma_leaving_water_offset")],
      trigger: [Trigger.timePattern({ minutes: "/15" })],
    })
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
  miasBedroom,
  boilerRoom,
];

const turnAllOffAutomation = new Automation({
  alias: "Turn off whole house",
  action: [
    ...tomsOffice.climates.map((climate) => climate.id).map(Action.turnOff),
    Action.parallel(
      ...allRooms
        .flatMap((room) => [
          ...room.lights
            .map(({ id }) => id)
            .filter((id) => id !== "light.ensuite_shower_light"),
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
  .addCard({
    type: "custom:vertical-stack-in-card",
    title: "Boiler Room",
    cards: [
      {
        type: "custom:mini-graph-card",
        name: "Water Temp",
        entities: ["sensor.altherma_climatecontrol_leaving_water_temperature"],
        line_width: 2,
        font_size: 75,
        smoothing: false,
        hours_to_show: 6,
        points_per_hour: 60,
        color_thresholds: [
          { color: "#0e7490", value: 40 },
          { color: "#64748b", value: 55 },
          { color: "#ea580c", value: 65 },
        ],
        color_thresholds_transition: "smooth",
      } as MiniGraphCard,
      {
        type: "custom:multiple-entity-row",
        entity: "climate.altherma_leaving_water_offset",
        toggle: true,
        entities: [
          {
            entity: heatPumpDailyKwhSensorId,
            name: "KWh Today",
          },
          {
            entity: dailyElectricityCost.id,
            name: "Cost Today",
          },
          {
            entity: "sensor.altherma_climatecontrol_outdoor_temperature",
            name: "Outdoor Temp",
          },
        ],
        icon: "mdi:fire",
        name: "Heat Pump",
      } as EntityRowCard,
    ],
  } as VerticalStackInCard)
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
    diningRoom,
    talisBedroom,
    miasBedroom,
    boilerRoom,
    wholeHouse,
  },
  dashboards: {
    _1_home,
    _2_heatingDashboard,
  },
});
