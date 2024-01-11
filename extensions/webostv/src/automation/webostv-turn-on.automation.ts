import { Automation, MediaPlayerTarget } from "@hassforge/base";
import { wakeOnLanAction } from "@hassforge/wake-on-lan";
import { snakeCase } from "change-case";

export class WebOSTVTurnOnAutomation extends Automation {
  constructor(mediaPlayer: MediaPlayerTarget, macAddress: string) {
    const alias = `Turn on ${
      mediaPlayer.name ?? mediaPlayer.id
    } using WakeOnLan when triggered by media player`;
    super({
      alias,
      id: snakeCase(alias),
      trigger: [
        {
          platform: "webostv.turn_on",
          entity_id: mediaPlayer.id,
        },
      ],
      action: [wakeOnLanAction(macAddress)],
    });
  }
}
