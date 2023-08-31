import { useMemo } from "react";
import { getDirectoryTree } from "./get-directory-tree";

export const useDirectoryPaths = (paths: string[]) => {
  return useMemo(() => getDirectoryTree(paths), [paths]);
};
