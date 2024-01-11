import { Action } from "@hassforge/base";

export const wakeOnLanAction = (mac: string) => {
  return Action.callService("wake_on_lan.send_magic_packet", {
    data: {
      mac,
    },
  });
};
