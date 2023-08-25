# HassForge

<center>
  <img width="120" alt="Shows an illustrated sun in light mode and a moon with stars in dark mode." src="assets/hassforge.png">
  <div>
    Code-first HomeAssistant Templating
  </div>
  <div>
  <small>
    Currently in alpha
  </small>
  </div>
</center>

## Why use HassForge?

- **Code first**: Harness the power of loops, variables, and string manipulation beyond YAML's capabilities.
- **Unified Frontend & Backend**: Simplify your workflow by integrating backend template sensors with frontend UI.
- **Pure YAML Output**:  No need to learn custom HomeAssistant integrations/addons/strategies — HassForge outputs HomeAssistant-friendly YAML.
- **Entirely Customizable**: Break free from the limitations of custom integrations and blueprints for unique solutions.
- **De-duplication**: Keeping it [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Yaml code hurts to read when you have a large smart home.
- **Fully Typed**: Editor-assisted correct YAML every time.

## The initial concept

- I originally wanted to build out a dashboard using all of my TS0201 radiator thermostats, I wanted to create
- A dashboard from all of these climate entities.
- Without digging into the specifics of any custom integrations/addons/strategies.
- I wanted to be able to quickly edit sensor templates and dashboard content.

## Example code

### hassforge.ts

```typescript
const lounge = new Room("Lounge")
  // Target an existing Home Assistant Climate Entity
  .addClimates({
    name: "Lounge TRV",
    id: "climate.theromstat_1",
  })
  // Create a new Home Assistant Climate Entity
  .addClimates(
    new GenericThermostatClimate({
      name: "Lounge Electric Radiator",
      heater: "switch.zigbee_switch_1",
      target_sensor: "sensor.zigbee_temp_1",
    })
  )
  .addLights({
    id: "light.zigbee_dimmer_1",
    name: "Lounge Light",
  })
  .addSwitches({
    id: "switch.zigbee_switch_2",
    name: "Lounge Fan",
    icon: "mdi:fan"
  })
  // Adds all the necessary sensors for the Room Heating Cards
  .extend(WithRoomHeating);

const heatingTab: HAView = {
  title: "Heating",
  path: "heating",
  cards: [roomHeatingCard(lounge)],
};

writeFiles("./out", {
  "lounge-backend": lounge.toPackage(),
  "heating-dashboard": heatingTab,
});
```

## Packages

- [@hassforge/types](workspaces/types): The basic HomeAssistant YAML types. You can use this if you want a lighter approach to HassForge
- [@hassforge/base](workspaces/base): This is where the Hassforge magic happens, contains the basic [`Room`](workspaces/base/src/room.ts) type for you to get started
- [@hassforge/packages](workspaces/packages): A few basic packages, this is going to be separated into separate packages.
- [@hassforge/cli](workspaces/cli): This is currently a WIP. Will be used to ingest your HassForge config and spit out your HomeAssistant YAML.

## TODO

- [ ] Create CLI to ingest config and output automatically
- [ ] Finish Home Assistant types package
- [ ] Split Home assistant packages into separate imports
- [ ] Deploy package to npm
