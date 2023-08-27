#!/usr/bin/env node
import { subcommands, run } from "cmd-ts";
import { inspect } from "./commands/inspect";
import { build } from "./commands/build";

const cmdParent = subcommands({
  name: "hassforge",
  description: "HassForge, code-first HomeAssistant eco-system",
  cmds: { build, inspect },
});

run(cmdParent, process.argv.slice(2));
