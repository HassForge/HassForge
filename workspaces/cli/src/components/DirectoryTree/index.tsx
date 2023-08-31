import { Box, Text } from "ink";
import { File, Directory as Dir, isDirectory } from './types'
import React from "react";


export type FileRenderer = (file: File) => React.ReactNode;

export interface FileProps extends File {
  fileRenderer?: FileRenderer;
}

export interface DirectoryProps extends Dir {
  fileRenderer?: FileRenderer;
}

const File: React.FC<FileProps> = ({
  fileName,
  depth,
  isLast,
  fullPath,
  fileRenderer,
}) => {
  const indentation = depth > 0 ? "│ ".repeat(depth - 1) : "";
  const prefix = depth > 0 ? (isLast ? "└─ " : "├─ ") : "";

  const renderedFile = fileRenderer ? (
    fileRenderer({ fileName, depth, isLast, fullPath })
  ) : (
    <>
      <Text>{fileName} - </Text>
      <Text color="gray">{fullPath}</Text>
    </>
  );

  if (renderedFile === null || renderedFile === "") {
    return null;
  }

  return (
    <Box>
      <Text>
        {indentation}
        {prefix}
      </Text>
      {renderedFile}
    </Box>
  );
};


export const Directory: React.FC<DirectoryProps> = ({
  fileName,
  files,
  depth,
  fullPath,
  fileRenderer,
}) => {
  return (
    <Box flexDirection="column">
      <File
        key={fileName}
        depth={depth}
        fileName={fileName}
        fullPath={fullPath}
        fileRenderer={fileRenderer}
      />
      {files.map((file, index) => {
        const isLast = index === files.length - 1;
        if (isDirectory(file)) {
          return (
            <Box key={file.fileName} flexDirection="column">
              <Directory {...file} fileRenderer={fileRenderer} />
            </Box>
          );
        } else {
          return (
            <File
              key={file.fileName}
              depth={depth + 1}
              fileName={file.fileName}
              fullPath={file.fullPath}
              isLast={isLast}
              fileRenderer={fileRenderer}
            />
          );
        }
      })}
    </Box>
  );
};
