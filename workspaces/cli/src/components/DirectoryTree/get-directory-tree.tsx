import path from "path";
import { Directory, File, isDirectory } from "./types";

export const getDirectoryTree = (filePaths: string[]): Directory[] => {
  const root: Directory = {
    fileName: "",
    depth: -1,
    fullPath: "",
    files: [],
  };
  const addPathToTree = (node: Directory, pathParts: string[]) => {
    let [current, ...rest] = pathParts;
    if (rest.length !== 0) current = (current ?? "") + "/";
    let child = node.files.find((file) => file.fileName === current) as
      | Directory
      | File;

    const fullPath = node.fullPath
      ? path.join(node.fullPath, current!)
      : current;

    if (!child) {
      if (rest.length === 0) {
        child = {
          fileName: current,
          depth: node.depth + 1,
          fullPath,
        } as File;
      } else {
        child = {
          fileName: current,
          depth: node.depth + 1,
          fullPath,
          files: [],
        } as Directory;
      }
      node.files.push(child);
    }

    if (isDirectory(child)) {
      addPathToTree(child, rest);
    }
  };

  filePaths.forEach((filePath) => {
    const pathParts = filePath.split("/");
    addPathToTree(root, pathParts);
  });


  return root.files as Directory[];
};
