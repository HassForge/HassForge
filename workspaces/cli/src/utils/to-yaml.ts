import { stringify } from "yaml";

export const toYAML = (data: any) => {
  return stringify(JSON.parse(JSON.stringify(data)), {
    version: "1.1",
  });
};
