import { MediaPlayerTarget, Provider, Room } from "@hassforge/base";
import { HAAutomation } from "@hassforge/types";
import { WebOSTVTurnOnAutomation } from "./automation/webostv-turn-on.automation";

export interface WebOSTVOptions {
  mediaPlayerTarget: MediaPlayerTarget;
  macAddress: string;
}

export interface WebOSTVIntegration {}

export class WithWebOSTV implements Provider<{ wake_on_lan: {} }> {
  static id = "webostv";

  wakeOnLanAutomation: HAAutomation;
  mediaPlayers?: MediaPlayerTarget[] | undefined;

  constructor(_: Room, { mediaPlayerTarget, macAddress }: WebOSTVOptions) {
    this.wakeOnLanAutomation = new WebOSTVTurnOnAutomation(
      mediaPlayerTarget,
      macAddress
    );
    this.mediaPlayers = [mediaPlayerTarget];
  }

  get automations() {
    return [this.wakeOnLanAutomation];
  }

  integrations = { wake_on_lan: {} };
}
