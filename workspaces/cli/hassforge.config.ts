import {
  Room,
  GenericThermostatClimate,
  HassBuilderPackage,
} from "@hassforge/base";
import { WithSwitchControlledThermostat } from "@hassforge/switch-controlled-thermostat";
import { HAView } from "@hassforge/types";

import { WithRoomHeating } from "@hassforge/room-heating";

const wardrobe = new Room("Wardrobe")
  .addLights({
    name: "Wardrobe Lights",
    id: "switch.shelly_shellypro4pm_84cca87f95dc_2",
  })
  .addClimates({
    name: "Wardrobe TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat_9",
  })
  .extend(WithRoomHeating);

const ensuiteShower = new Room("Ensuite Shower")
  .addLights(
    {
      name: "Ensuite Shower Lights",
      id: "light.shelly_shdm_2_c45bbe5725d0",
    },
    {
      name: "Ensuite Shower Mirror",
      id: "switch.shelly_shellypro4pm_84cca87ef154_2",
    }
  )
  .addSwitches({
    name: "Ensuite VMC",
    id: "switch.shelly_shellypro4pm_84cca87f95dc_4",
  });

const ensuiteToilet = new Room("Ensuite Toilet").addLights({
  name: "Ensuite Toilet Light",
  id: "light.shelly_shdm_2_4c752532d875",
});

const mainBedroom = new Room("Main Bedroom")
  .addClimates({
    name: "Main Bedroom TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat_8",
  })
  .addSwitches({
    name: "Main Bedroom Lights",
    id: "switch.shelly_shellypro4pm_84cca87f95dc_1",
  })
  .addSwitches({
    name: "Main Bedroom Fan",
    id: "switch.legrand_connected_outlet_switch_3",
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

const upstairsHallway = new Room("Upstairs Hallway")
  .addSwitches({
    id: "switch.legrand_connected_outlet_switch_5",
    name: "Upstairs Hallway Socket",
  })
  .addLights({
    id: "switch.shelly_shellypro4pm_84cca87ef154_1",
    name: "Upstairs Hallway Lights",
  })
  .addLights({
    id: "switch.shelly_shellyplus1_80646fdcdaf8",
    name: "Landing Lights",
  });

const downstairsHallway = new Room("Downstairs Hallway")
  .addLights({
    id: "switch.shelly_shellypro4pm_84cca87ef154_1",
    name: "Stairs Light",
  })
  .addLights({
    id: "switch.shelly_shellyplus1_80646fc82a04",
    name: "Dining Room Light",
  })
  .addLights({
    id: "switch.shelly_shellyplus1_80646fc7e7c8",
    name: "Utility Light",
  });

const lounge = new Room("Lounge")
  .addLights({
    id: "light.shelly_shdm_2_4c752533ae9d",
    name: "Lounge Lights",
  })
  .addSwitches({
    id: "switch.legrand_connected_outlet_switch",
    name: "Lounge Switch",
  })
  .addClimates({
    name: "Near Kitchen TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat_5",
  })
  .addClimates({
    name: "Near Windows TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat",
  })
  .addClimates({
    name: "Corner TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat_2",
  })
  .extend(WithRoomHeating);

const musicRoom = new Room("Music Room")
  .addClimates({
    name: "Music Room TRV",
    id: "climate.tze200_6rdj8dzm_ts0601_thermostat_3",
  })
  .addLights({
    id: "light.shelly_shdm_2_c45bbe56d5c2",
    name: "Music Room Light",
  })
  .addSwitches({
    id: "switch.tze200_6rdj8dzm_ts0601_switch_3",
    name: "Music Room Switch",
  })
  .extend(WithRoomHeating);

const kitchen = new Room("Kitchen")
  .addLights(
    {
      name: "Kitchen Pendant",
      id: "switch.shelly_shellypro4pm_84cca87fbb6c_1",
    },
    {
      name: "Kitchen Spots",
      id: "switch.shelly_shellypro4pm_84cca87fbb6c_2",
    },
    {
      name: "Kitchen Under Counter",
      id: "switch.shelly_shellypro4pm_84cca87fa300_2",
    },
    {
      name: "Kitchen Over Counter",
      id: "switch.shelly_shellypro4pm_84cca87fa300_1",
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
  id: "switch.shelly_shellypro4pm_84cca87fbb6c_3",
});

const outsideFront = new Room("Front").addLights(
  {
    name: "Front Wall Lights",
    id: "switch.shelly_shellypro4pm_84cca87ef154_3",
  },
  {
    name: "Front Floodlight",
    id: "switch.shelly_shellypro4pm_84cca87ef154_4",
  }
);

const tomsOffice = new Room("Toms Office")
  .addClimates(
    new GenericThermostatClimate({
      name: "Toms Office Electric",
      heater: "switch.shelly_shsw_1_e89f6d86a7a1",
      target_sensor: "sensor.tze200_dwcarsat_ts0601_temperature",
    })
  )
  .extend(WithRoomHeating);

const endBedroom = new Room("End Bedroom")
  .addClimates(
    new GenericThermostatClimate({
      name: "End Bedroom Electric",
      heater: "switch.0x04cf8cdf3c89dcdd",
      target_sensor: "sensor.0xa4c138bf686fe61c_temperature",
    })
  )
  .extend(WithRoomHeating);

const spareBedroom = new Room("Talis Bedroom")
  .addLights({
    id: "switch.shelly_shellypro4pm_84cca87f95dc_3",
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

const heatingRooms = [
  mainBedroom,
  wardrobe,
  endBedroom,
  spareBedroom,
  lounge,
  musicRoom,
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
    rooms: heatingRooms,
    includeClimate: (_, climate) => climate.id.includes("ts0601"),
  }
);

const heatingTab: HAView = {
  panel: false,
  title: "Heating",
  path: "heating",
  badges: [],
  cards: [
    boilerRoom.cards.switchControlledThermostatCard(),
    ...heatingRooms.map((heating) => heating.cards.roomHeating()),
  ],
};

export const packages = {
  backend: new HassBuilderPackage().mergePackage(
    ...heatingRooms.map((room) => room.toPackage())
  ),
};

export const views = {
  heatingTab,
};

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
