export type ClassOption = "on" | "off" | "pressingOn" | "pressingOff";

export type ColorMap<T extends string> = {
  [key in T]: {
    [key in ClassOption]?: string;
  };
};

export const colors = {
  red: ["#7f1d1d", "#dc2626"],
  yellow: ["#713f12", "#facc15"],
  green: ["#14532d", "#22c55e"],
  orange: ["#7c2d12", "#ea580c"],
  heating: ["blue", "white", "red"],
  test: ["rebeccapurple", "red", "oklch(85% 0.18 85)", "blue"],
};
