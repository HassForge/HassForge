import {
  Room,
  GenericThermostatClimate,
  Dashboard,
  Automation,
  Trigger,
  Action,
  Condition,
} from "@hassforge/base";
import { WithSwitchControlledThermostat } from "@hassforge/switch-controlled-thermostat";
import { WithRoomHeating } from "@hassforge/room-heating";
import { climateSchedulerCard } from "@hassforge/entities/src/climate-scheduler/cards";
import { MushroomDashboard } from "@hassforge/mush-room";

export const wardrobe = new Room("Wardrobe")
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
    new Automation({
      alias: "Wardrobe Motion Activated Lights",
      mode: "single",
      trigger: [
        Trigger.state("binary_sensor.ewelink_66666_iaszone", {
          id: "detected",
          to: "on",
        }),
        Trigger.state("binary_sensor.ewelink_66666_iaszone", {
          id: "clear",
          to: "off",
        }),
      ],
      action: [
        Action.choose([
          {
            conditions: Condition.trigger("detected"),
            sequence: [Action.turnOn("switch.wardrobe_lights")],
          },
          {
            conditions: Condition.trigger("clear"),
            sequence: [Action.turnOff("switch.wardrobe_lights")],
          },
        ]),
      ],
    })
  )
  .extend(WithRoomHeating);

export const ensuiteShower = new Room("Ensuite Shower")
  .addLights(
    {
      name: "Ensuite Shower Lights",
      id: "light.ensuite_shower_light",
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

export const ensuiteToilet = new Room("Ensuite Toilet").addLights({
  name: "Ensuite Toilet Light",
  id: "light.shellydimmer2_4c752532d875",
  dimmable: true,
});

export const mainBedroom = new Room("Main Bedroom")
  .addClimates({
    name: "Main Bedroom TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat",
  })
  .addSwitches({
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
  .extend(WithRoomHeating);

export const upstairsHallway = new Room("Upstairs Hallway")
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

export const downstairsHallway = new Room("Downstairs Hallway")
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

export const lounge = new Room("Lounge")
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
  .extend(WithRoomHeating);

export const kitchen = new Room("Kitchen")
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

export const outsideBack = new Room("Back").addLights({
  name: "Patio Lights",
  id: "switch.bifold_lights",
});

export const outsideFront = new Room("Front").addLights(
  {
    name: "Front Wall Lights",
    id: "switch.front_lights",
  },
  {
    name: "Front Floodlight",
    id: "switch.floodlight",
  }
);

export const tomsOffice = new Room("Toms Office")
  .addClimates(
    new GenericThermostatClimate({
      name: "Toms Office Electric",
      heater: "switch.heated",
      target_sensor: "sensor.tze200_dwcarsat_ts0601_temperature",
    })
  )
  .extend(WithRoomHeating);

export const endBedroom = new Room("End Bedroom")
  .addClimates(
    new GenericThermostatClimate({
      name: "End Bedroom Electric",
      heater: "switch.0x04cf8cdf3c89dcdd",
      target_sensor: "sensor.0xa4c138bf686fe61c_temperature",
    })
  )
  .extend(WithRoomHeating);

export const spareBedroom = new Room("Talis Bedroom")
  .addLights({
    id: "switch.spare_bed_lights",
    name: "Talis Bedroom Light",
  })
  .addClimates({
    name: "Talis Bedroom TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat_7",
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
  lounge,
  kitchen,
  tomsOffice,
];

export const boilerRoom = new Room("Boiler Room").extend(
  WithSwitchControlledThermostat,
  {
    boilerOptions: {
      haSwitch: boilerSwitch,
      powerConsumptionSensor: boilerPowerConsumptionSensor,
      powerConsumptionStandbyRange: [130, 200],
    },
    rooms: roomsWithHeating,
    includeClimate: (_, climate) => climate.id.includes("ts0601"),
  }
);

export const _1_home = new MushroomDashboard("Home").addRooms(
  lounge,
  kitchen,
  mainBedroom,
  wardrobe,
  ensuiteShower,
  ensuiteToilet,
  upstairsHallway,
  downstairsHallway,
  outsideBack,
  outsideFront,
  tomsOffice,
  endBedroom,
  spareBedroom,
  boilerRoom
);

export const _2_heatingDashboard = new Dashboard("Heating")
  .addCard(climateSchedulerCard(roomsWithHeating))
  .addCard(boilerRoom.extensions.switchControlledThermostat.card())
  .addCards(
    roomsWithHeating.map((heating) => heating.extensions.roomHeating.card())
  );

/*
alias: Wardrobe Motion
description: ""
trigger:
  - platform: state
    entity_id:
      - binary_sensor.ewelink_66666_iaszone
    to: "on"
    id: wardrobe_Detected
  - platform: state
    entity_id:
      - binary_sensor.ewelink_66666_iaszone
    to: "off"
    id: wardrobe_Clear
  - platform: state
    entity_id:
      - binary_sensor.ensuite_motion
    to: "off"
    id: ensuite_Clear
  - platform: state
    entity_id:
      - binary_sensor.ensuite_motion
    to: "on"
    id: ensuite_Detected
condition: []
action:
  - choose:
      - conditions:
          - condition: trigger
            id:
              - wardrobe_Detected
        sequence:
          - service: switch.turn_on
            data: {}
            target:
              entity_id: switch.shelly_shellypro4pm_84cca87f95dc_2
      - conditions:
          - condition: trigger
            id:
              - wardrobe_Clear
        sequence:
          - service: switch.turn_off
            data: {}
            target:
              entity_id: switch.shelly_shellypro4pm_84cca87f95dc_2
mode: single

*/

// const wardrobeAutomation: HAAutomation = {
//   alias: "Wardrobe Motion",
//   trigger: [
//     {
//       platform: "state",
//       entity_id: ["binary_sensor.ewelink_66666_iaszone"],
//       to: "on",
//       id: "wardrobe_Detected",
//     },
//     {
//       platform: "state",
//       entity_id: ["binary_sensor.ewelink_66666_iaszone"],
//       to: "off",
//       id: "wardrobe_Clear",
//     },
//     {
//       platform: "state",
//       entity_id: ["binary_sensor.ensuite_motion"],
//       to: "on",
//       id: "ensuite_Detected",
//     },
//     {
//       platform: "state",
//       entity_id: ["binary_sensor.ensuite_motion"],
//       to: "off",
//       id: "ensuite_Clear",
//     },
//   ],
//   action: [
//     {
//       choose: [
//         {
//           conditions: [
//             {
//               condition: "trigger",
//               id: ["wardrobe_Detected"],
//             },
//           ],
//           sequence: [
//             {
//               service: "switch.turn_on",
//               target: {
//                 entity_id: "switch.shelly_shellypro4pm_84cca87f95dc_2",
//               },
//             },
//           ],
//         },
//         {
//           conditions: [
//             {
//               condition: "trigger",
//               id: ["wardrobe_Clear"],
//             },
//           ],
//           sequence: [
//             {
//               service: "switch.turn_off",
//               target: {
//                 entity_id: "switch.shelly_shellypro4pm_84cca87f95dc_2",
//               },
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

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
