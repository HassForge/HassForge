import path from "path";
import { loadConfig } from "./config";
import { toYAML } from "./utils/to-yaml";

export interface BuildConfigOptions {
  configFilePath: string;
  buildDir: string;
  dashboardDirName: string;
  packagesName: string;
}

export const buildConfig = async ({
  buildDir,
  configFilePath,
  dashboardDirName,
  packagesName,
}: BuildConfigOptions) => {
  const config = await loadConfig(configFilePath);
  if (!config) {
    throw new Error(`Config at ${configFilePath} is empty`);
  }
  const dashboardDir = path.join(buildDir, dashboardDirName);

  const dashboards = Object.entries(config.dashboards).reduce<{
    [key: string]: string;
  }>(
    (acc, [key, dashboard]) => ({
      ...acc,
      [path.join(dashboardDir, `${key}.yml`)]: toYAML(dashboard),
    }),
    {}
  );
  const packages = Object.entries(config.rooms).reduce<{
    [key: string]: string;
  }>(
    (acc, [key, room]) => ({
      ...acc,
      [path.join(path.join(buildDir, packagesName), `${key}.yml`)]: toYAML(
        room.toPackage()
      ),
    }),
    {}
  );
  return {
    dashboards,
    packages,
  };
};
