import { command, option, string } from "cmd-ts";
import { File } from "cmd-ts/dist/cjs/batteries/fs";
import { render } from "ink";
import React from "react";
import { buildConfig } from "../build-config";
import { access, readFile, writeFile, mkdir } from "fs/promises";
import { dirname, resolve } from "path";
import { constants } from "fs";
import { BuildApp, BuildAppFileStatus } from "../components/BuildApp";

export const buildArgs = {
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
};

export const build = command({
  name: "build",
  description: "Build your home assistant YAML from your hassforge config file",
  version: "0.0.1",
  args: buildArgs,
  handler: async ({
    configFilePath,
    buildDir,
    dashboardDirName,
    packagesName,
  }) => {
    const { dashboards, packages } = await buildConfig({
      configFilePath,
      buildDir,
      dashboardDirName,
      packagesName,
    });

    const files = { ...dashboards, ...packages };

    const getFileStatus = async (
      path: string,
      newContent: string
    ): Promise<BuildAppFileStatus> => {
      let status: BuildAppFileStatus = "NEW_FILE";
      try {
        await access(path, constants.F_OK);
      } catch {
        return status;
      }
      try {
        const contents = await readFile(path);
        if (contents.toString() === newContent) {
          status = "CONTENTS_UNCHANGED";
        } else {
          status = "CONTENTS_CHANGED";
        }
      } catch (e) {
        console.error(e);
        status = "ERROR_READING_FILE";
      }
      return status;
    };

    const write = async (filePath: string, contents: string) => {
      await mkdir(dirname(filePath), { recursive: true });
      await writeFile(filePath, contents);
    };

    // TODO: Convert this to use keyof files, and the build app to require keyof files.
    const pathMap = Object.keys(files).reduce<{ [path: string]: string }>(
      (acc, path) => ({ ...acc, [path]: resolve(path) }),
      {}
    );

    const getFullPath = (path: string) => pathMap[path]!;
    render(
      <BuildApp
        files={files}
        getFileStatus={getFileStatus}
        write={write}
        getFullPath={getFullPath}
      />
    );
  },
});
