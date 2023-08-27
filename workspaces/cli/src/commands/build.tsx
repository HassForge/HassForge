import { boolean, command, flag, option, string } from "cmd-ts";
import "@hassforge/base";
import "@hassforge/entities";
import "@hassforge/types";
import { loadConfig } from "../config";
import { File } from "cmd-ts/dist/cjs/batteries/fs";
import path from "path";
import { mkdir } from "fs/promises";
import { writeToYAML } from "../utils/write-to-yaml";
import { mergeHAPackages } from "../utils/merge-package";

export const build = command({
  name: "build",
  description: "Build your home assistant YAML from your hassforge config file",
  version: "0.0.1",
  args: {
    configFilePath: option({
      type: File,
      defaultValue: () => "hassforge.config.ts",
      description: "Config file path",
      long: "config",
      short: "c",
      env: "HASSFORGE_CONFIG",
    }),
    buildDir: option({
      type: string,
      defaultValue: () => "./build",
      description:
        "Build directory, both frontend and backend yaml files will be built to this location. This can be set safely to the root of your home assistant installation",
      long: "build-directory",
      short: "o",
      env: "HASSFORGE_BUILD_DIR",
    }),
    packagesName: option({
      type: string,
      defaultValue: () => "hassforge-packages",
      description:
        "Backend yaml files directory name, this is where all of your sensors, climates, etc yaml files will go. When used with --split, this will be appended with .yml",
      long: "packages-name",
      short: "pkg",
      env: "HASSFORGE_PACKAGE_BUILD_NAME",
    }),
    dashboardDirName: option({
      type: string,
      defaultValue: () => "hassforge-dashboards",
      description:
        "Frontend yaml files directory name, this is where all of your dashboard cards yaml files will go",
      long: "dashboard-directory-name",
      short: "dash",
      env: "HASSFORGE_DASHBOARD_BUILD_DIR_NAME",
    }),
    splitPackages: flag({
      long: "split-packages",
      short: "psplit",
      description:
        "Enabling this flag will break each of your backend packages into a separate file",
      type: boolean,
      env: "HASSFORGE_SPLIT_PACKAGES",
    }),
  },
  handler: async ({
    configFilePath,
    buildDir,
    dashboardDirName,
    packagesName,
    splitPackages,
  }) => {
    const config = await loadConfig(configFilePath);
    if (!config) {
      throw new Error(`Config at ${configFilePath} is empty`);
    }
    const dashboardDir = path.join(buildDir, dashboardDirName);

    const writePromises = Object.entries(config.dashboards).map(
      ([key, dashboard]) =>
        writeToYAML(path.join(dashboardDir, `${key}.yml`), dashboard)
    );
    await Promise.all(writePromises);

    // Create required directories
    await mkdir(dashboardDir, { recursive: true });

    // Write the files
    if (splitPackages) {
      const packagesDir = path.join(buildDir, packagesName);
      await mkdir(packagesDir, { recursive: true });
      const writePromises = Object.entries(config.rooms).map(([key, room]) =>
        writeToYAML(path.join(packagesDir, `${key}.yml`), room.toPackage())
      );
      await Promise.all(writePromises);
    } else {
      await mkdir(buildDir, { recursive: true });
      const packagesFile = path.join(buildDir, `${packagesName}.yml`);
      const mergedPackages = mergeHAPackages(
        Object.values(config.rooms).map((value) => value.toPackage())
      );
      await writeToYAML(packagesFile, mergedPackages);
    }
  },
});
