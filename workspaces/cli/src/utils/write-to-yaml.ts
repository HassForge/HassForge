import { writeFile, mkdir } from "fs/promises";
import { parse } from "path";
import { toYAML } from "./to-yaml";

export const writeToYAML = async (filePath: string, data: any) => {
  const { dir } = parse(filePath);
  await mkdir(dir, { recursive: true });
  await writeFile(filePath, toYAML(data));
};
