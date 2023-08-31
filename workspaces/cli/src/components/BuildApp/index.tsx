import { ConfirmInput, Spinner } from "@inkjs/ui";
import { Box, Text } from "ink";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { FileRenderer, Directory } from "../DirectoryTree";
import { filter, isDirectory } from "../DirectoryTree/types";
import { useDirectoryPaths } from "../DirectoryTree/use-directory-paths";

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}
interface BuildAppProps {
  files: { [path: string]: string };
  getFileStatus: (
    path: string,
    newContent: string
  ) => Promise<BuildAppFileStatus>;
  write: (path: string, contents: string) => Promise<void>;
  getFullPath: (path: string) => string;
  onCancel?: () => void;
  onComplete?: () => void;
  onConfirm?: () => Promise<void>;
}

export type BuildAppFileStatus =
  | "NEW_FILE"
  | "CONTENTS_CHANGED"
  | "CONTENTS_UNCHANGED"
  | "ERROR_READING_FILE";

export const BuildApp: React.FC<BuildAppProps> = ({
  files,
  getFileStatus,
  write,
  getFullPath,
  onCancel,
  onComplete
}) => {
  const [loading, setLoading] = useState(true);
  const directoryPaths = useMemo(() => Object.keys(files), [files]);
  const [fileStatuses, setFileStatuses] = useState<{
    [fullPath: string]: BuildAppFileStatus;
  }>({});
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<
    "NEED_CONFIRMATION" | "WRITING" | "CANCELLED" | "BUILT"
  >("NEED_CONFIRMATION");
  useEffect(() => {
    (async () => {
      try {
        const result = await directoryPaths.reduce<
          Promise<{ [key: string]: BuildAppFileStatus }>
        >(async (acc, path) => {
          const prevResult = await acc;
          const status = await getFileStatus(path, files[path]!);
          return { ...prevResult, [path]: status };
        }, Promise.resolve({}));
        setFileStatuses(result);
      } finally {
        setLoading(false);
      }
    })();
  }, [directoryPaths]);

  const onlyChangedFiles = useMemo(() => {
    return Object.entries(fileStatuses).reduce<{ [filePath: string]: string }>(
      (acc, [key, status]) => {
        if (status === "CONTENTS_UNCHANGED") return acc;
        return { ...acc, [key]: files[key]! };
      },
      {}
    );
  }, [directoryPaths, fileStatuses]);

  const directoryTrees = useDirectoryPaths(directoryPaths);
  const filteredFiles = useMemo(() => {
    return directoryTrees
      .map((tree) =>
        filter(
          tree,
          (file) => fileStatuses[file.fullPath] !== "CONTENTS_UNCHANGED"
        )
      )
      .filter(notEmpty)
      .map((tree) =>
        filter(tree, (file) => {
          return !isDirectory(file) || file.files.length !== 0;
        })
      )
      .filter(notEmpty);
  }, [directoryTrees, fileStatuses]);

  const fileRenderer: FileRenderer = useCallback(
    ({ fileName, fullPath }) => {
      const icon =
        fileStatuses[fullPath] === "NEW_FILE"
          ? "+ "
          : fileStatuses[fullPath] === "CONTENTS_CHANGED"
          ? "~ "
          : fileStatuses[fullPath] === "ERROR_READING_FILE"
          ? "⚠ "
          : "";
      const color =
        fileStatuses[fullPath] === "NEW_FILE"
          ? "green"
          : fileStatuses[fullPath] === "CONTENTS_CHANGED"
          ? "yellow"
          : fileStatuses[fullPath] === "ERROR_READING_FILE"
          ? "red"
          : undefined;
      return (
        <Box>
          <Box>
            <Text color={color}>{icon}</Text>
          </Box>
          <Box>
            <Text color={color}>{fileName}</Text>
          </Box>
          <Box>
            <Text> - </Text>
          </Box>
          <Text color="gray">{getFullPath(fullPath)}</Text>
        </Box>
      );
    },
    [onlyChangedFiles]
  );

  const build = useCallback(async () => {
    setStatus("WRITING");
    try {
      const promises = Object.entries(onlyChangedFiles).map(
        async ([filePath, contents]) => write(filePath, contents)
      );
      await Promise.all(promises);
    } catch (e) {
      setError((e as Error).message);
    }
    setStatus("BUILT");
    onComplete?.();
  }, [onlyChangedFiles]);

  return (
    <Box flexDirection="column">
      {!loading ? (
        <>
          <Box overflowY="visible">
            {filteredFiles.map((tree) => (
              <Directory
                key={tree.fullPath}
                {...tree}
                fileRenderer={fileRenderer}
              />
            ))}
          </Box>
          {error ? (
            <Box>
              <Text color="red">{error}</Text>
            </Box>
          ) : filteredFiles.length <= 0 ? (
            <Box>
              <Text>No changes to make!</Text>
            </Box>
          ) : status === "NEED_CONFIRMATION" ? (
            <Box>
              <Text bold>Are you happy to overwrite the files? </Text>
              <ConfirmInput
                onConfirm={build}
                onCancel={() => {
                  setStatus("CANCELLED");
                  onCancel?.();
                }}
              />
            </Box>
          ) : status === "BUILT" ? (
            <Box>
              <Text color={"green"}>
                Wrote{" "}
                <Text bold color="greenBright">
                  {Object.values(onlyChangedFiles).length}
                </Text>{" "}
                files.
              </Text>
            </Box>
          ) : status === "CANCELLED" ? (
            <Box>
              <Text>Cancelled.</Text>
            </Box>
          ) : status === "WRITING" ? (
            <Box>
              <Spinner label="Writing Files..." />
            </Box>
          ) : null}
        </>
      ) : (
        <Box>
          <Spinner label="Loading & Building..." />
        </Box>
      )}
    </Box>
  );
};
