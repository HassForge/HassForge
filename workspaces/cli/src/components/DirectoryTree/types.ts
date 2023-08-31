export interface File {
  fileName: string;
  depth: number;
  fullPath: string;
  isLast?: boolean;
}

export interface Directory extends File {
  files: (Directory | File)[];
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}
export const isDirectory = (x: Directory | File): x is Directory =>
  "files" in x && Array.isArray(x.files);

export const filter = (
  dir: Directory,
  predicate: (file: File | Directory) => boolean
): Directory | undefined => {
  const resultingFile = {
    ...dir,
    files: dir.files
      .filter((file) => isDirectory(file) || predicate(file))
      .map((file) => (isDirectory(file) ? filter(file, predicate) : file))
      .filter(notEmpty),
  };
  return predicate(resultingFile) ? resultingFile : undefined;
};
