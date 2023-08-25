#!/usr/bin/env node
import { subcommands, run } from "cmd-ts";
import { build } from "./commands/build";

const cmdParent = subcommands({
  name: "hassforge",
  description: "HassForge, code-first HomeAssistant templating",
  cmds: { build },
});

run(cmdParent, process.argv.slice(2));
