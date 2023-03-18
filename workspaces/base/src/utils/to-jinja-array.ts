export const toJinjaArrayLiteral = (arr: string[]) =>
  `[ ${arr.map((x) => `'${x}'`).join(", ")} ]` as const;
