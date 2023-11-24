import { Dashboard, Room } from "@hassforge/base";
import { HAView } from "@hassforge/types";
import { cosmiconfig } from "cosmiconfig";
import { TypeScriptLoader } from "cosmiconfig-typescript-loader";

export interface Config {
  views: { [key: string]: HAView } | HAView[];
  rooms: { [key: string]: Room } | Room[];
}

export const parseRooms = (config: unknown) => {
  if (!config) {
    throw new Error("Config to parse is empty");
  }
  if (typeof config !== "object")
    throw new Error("Config to parse is not an object", {
      cause: config,
    });

  return Object.entries(config).reduce<{ [key: string]: Room }>(
    (acc, [key, room]) => ({
      ...acc,
      [key]: room,
    }),
    {}
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

  return Object.entries(config).reduce<{ [key: string]: Dashboard }>(
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
  if (!result.config.default) {
    throw new Error("Could not get config from file.");
  }
  const rooms = parseRooms(result.config.default.rooms);
  const dashboards = parseDashboards(result.config.default.dashboards);
  return { rooms, dashboards };
};
