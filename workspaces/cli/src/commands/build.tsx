import { command, string, optional, union, positional } from "cmd-ts";
import { stat } from "fs/promises";
import { cosmiconfig } from "cosmiconfig";
import { TypeScriptLoader } from "cosmiconfig-typescript-loader";
import { render, Text } from "ink";
import React, { useEffect, useState } from "react";
import { to } from "await-to-js";
import Spinner from "ink-spinner";
import "@hassforge/base";
import "@hassforge/packages";
import "@hassforge/types";

const explorer = cosmiconfig("hassforge", {
  loaders: {
    ".ts": TypeScriptLoader(),
  },
});

export const build = command({
  name: "build",
  description: "Build your home assistant yaml from a config file",
  version: "0.0.1",
  args: {
    configFile: positional({
      type: optional(string),
      displayName: "Config file",
    }),
  },
  handler: async (args) => {
    const configFilePath = args.configFile ?? "hassforge.config.ts";
    render(<BuildApp configFilePath={configFilePath} />);
  },
});

interface BuildAppProps {
  configFilePath: string;
}

const BuildApp: React.FC<BuildAppProps> = ({ configFilePath }) => {
  const [config, setConfig] = useState<string>();
  const [globalErrorMessage, setGlobalErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<string | undefined>(
    "Loading Packages"
  );

  useEffect(() => {
    (async () => {
      setLoading("Reading file");
      setGlobalErrorMessage(undefined);
      setConfig(undefined);
      try {
        const [error, fileStats] = await to(stat(configFilePath));
        if (error) {
          if ((error as any).code === "ENOENT") {
            setGlobalErrorMessage(`Config file '${configFilePath}' not found.`);
          } else {
            setGlobalErrorMessage(
              `Error getting file stats for '${configFilePath}', ${error.message}`
            );
          }
          return;
        }
        if (!fileStats.isFile()) {
          setGlobalErrorMessage(`'${configFilePath}' is not a file`);
          return;
        }
        setLoading("Loading configuration");
        const result = await explorer.load(configFilePath);
        if (!result?.config) {
          setGlobalErrorMessage(`${configFilePath} is empty`);
          return;
        }
        setConfig(result.config);
      } finally {
        setLoading(undefined);
      }
    })();
  }, [configFilePath]);

  return globalErrorMessage ? (
    <Text color="red">{globalErrorMessage}</Text>
  ) : loading ? (
    <Text>
      <Text color="green">
        <Spinner type="dots" />
      </Text>{" "}
      {loading}
    </Text>
  ) : (
    <Text>{JSON.stringify(config, null, 4)}</Text>
  );
};
