import { Dashboard, Room } from "@hassforge/base";
import { HAView } from "@hassforge/types";
import { cosmiconfig } from "cosmiconfig";
import { TypeScriptLoader } from "cosmiconfig-typescript-loader";

export interface Config {
  views: { [key: string]: HAView } | HAView[];
  rooms: { [key: string]: Room } | Room[];
}

const validateRoom = (room: unknown): room is Room => {
  // Instanceof is returning false, assuming it's to do with maybe
  // the packages are being reloaded instead of used directly through cosmiconfig
  return (
    typeof room === "object" && (room as Room).constructor.name === Room.name
  );
};

export const parseRooms = (config: unknown) => {
  if (!config) {
    throw new Error("Config to parse is empty");
  }
  if (typeof config !== "object")
    throw new Error("Config to parse is not an object", {
      cause: config,
    });

  return Object.entries(config)
    .filter(([_, value]) => validateRoom(value))
    .reduce<{ [key: string]: Room }>(
      (acc, [key, room]) => ({
        ...acc,
        [key]: room,
      }),
      {}
    );
};

const validateDashboard = (dashboard: unknown): dashboard is Dashboard => {
  return (
    typeof dashboard === "object" &&
    (dashboard as Dashboard).constructor.name === Dashboard.name
  );
};

export const parseDashboards = (config: unknown) => {
  if (!config) {
    throw new Error("Config to parse is empty");
  }
  if (typeof config !== "object")
    throw new Error("Config to parse is not an object", {
      cause: config,
    });

  return Object.entries(config)
    .filter(([_, value]) => validateDashboard(value))
    .reduce<{ [key: string]: Dashboard }>(
      (acc, [key, room]) => ({
        ...acc,
        [key]: room,
      }),
      {}
    );
};

export const loadConfig = async (configFilePath: string) => {
  const explorer = cosmiconfig("hassforge", {
    loaders: {
      ".ts": TypeScriptLoader(),
    },
  });
  const result = await explorer.load(configFilePath);
  if (!result?.config) {
    return undefined;
  }
  const rooms = parseRooms(result.config);
  const dashboards = parseDashboards(result.config);
  return { rooms, dashboards };
};
