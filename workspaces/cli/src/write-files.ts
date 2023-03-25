import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import { stringify } from "yaml";

export const writeFiles = (
  directory: string,
  data: { [fileName: string]: any }
) => {
  try {
    mkdirSync(directory, { recursive: true });
  } catch (error) {
    console.error(error);
  }
  Object.entries(data).forEach(([fileName, hassPackage]) =>
    writeFileSync(
      path.join(directory, `${fileName}.yaml`),
      stringify(JSON.parse(JSON.stringify(hassPackage)), {
        version: "1.1",
      })
    )
  );
};
