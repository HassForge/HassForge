import { command, string, optional, positional } from "cmd-ts";
import { Box, render, Text } from "ink";
import React, { useState } from "react";
import Spinner from "ink-spinner";
import "@hassforge/base";
import "@hassforge/entities";
import "@hassforge/types";
import { Tabs, Tab } from "ink-tab";
import SelectInput from "ink-select-input";
import { useLoadConfig } from "../hooks/use-load-config";

interface InspectAppProps {
  configFilePath: string;
}

const InspectApp: React.FC<InspectAppProps> = ({ configFilePath }) => {
  const [_, setHighlightedRoomKey] =
    useState<keyof typeof rooms>();
  const [__, setHighlightedDashboardKey] =
    useState<keyof typeof dashboards>();
  const {
    data: { rooms, dashboards },
    error: loadConfigError,
    loading: loadingConfig,
  } = useLoadConfig(configFilePath);

  const [tab, setTab] = useState<"rooms" | "dashboards">();
  const onTabChange = (name: string) => setTab(name as "rooms" | "dashboards");

  return loadConfigError ? (
    <Text color="red">{loadConfigError}</Text>
  ) : loadingConfig ? (
    <Text>
      <Text color="green">
        <Spinner type="dots" />
      </Text>
      {` Loading Configuration from ${configFilePath}`}
    </Text>
  ) : (
    <Box flexDirection="column" flexShrink={0} flexGrow={1}>
      <Tabs onChange={onTabChange} showIndex={false}>
        {<Tab name="rooms">Rooms ({Object.keys(rooms ?? {}).length})</Tab>}
        <Tab name="dashboards">
          Dashboards ({Object.keys(dashboards ?? {}).length})
        </Tab>
      </Tabs>
      <Box flexDirection="row" flexShrink={0} flexGrow={1}>
        {tab === "rooms" ? (
          <>
            <Box borderStyle={"single"} flexShrink={1} flexGrow={0}>
              <SelectInput
                onHighlight={(item) =>
                  setHighlightedRoomKey(item.value as keyof typeof rooms)
                }
                items={Object.keys(rooms ?? {}).map((key) => ({
                  label: key,
                  value: key,
                }))}
              />
            </Box>
            <Box borderStyle={"single"} flexShrink={0} flexGrow={1}></Box>
          </>
        ) : (
          <>
            <Box borderStyle={"single"} flexShrink={1} flexGrow={0}>
              <SelectInput
                onHighlight={(item) =>
                  setHighlightedDashboardKey(
                    item.value as keyof typeof dashboards
                  )
                }
                items={Object.keys(dashboards ?? {}).map((key) => ({
                  label: key,
                  value: key,
                }))}
              />
            </Box>
            <Box borderStyle={"single"} flexShrink={0} flexGrow={1}></Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export const inspect = command({
  name: "inspect",
  description: "<WIP> Inspect your hassforge config file",
  version: "0.0.1",
  args: {
    configFile: positional({
      type: optional(string),
      displayName: "Config file",
    }),
  },
  handler: async (args) => {
    const configFilePath = args.configFile ?? "hassforge.config.ts";
    render(<InspectApp configFilePath={configFilePath} />);
  },
});
