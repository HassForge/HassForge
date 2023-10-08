export type ClassOption = "on" | "off" | "pressingOn" | "pressingOff";

export type ColorMap<T extends string> = {
  [key in T]: {
    [key in ClassOption]?: string;
  };
};
