export const backgroundColors = ["gray"] as const;
export type BackgroundColor = (typeof backgroundColors)[number];

export const foregroundColors = ["none", "yellow", "red", "orange"] as const;
export type ForegroundColor = (typeof foregroundColors)[number];

export const sizes = ["xs", "sm", "md", "lg", "xl"] as const
export type Size = (typeof sizes)[number]

export const isBackgroundColor = (color?: string): color is BackgroundColor => {
  return !!color && backgroundColors.includes(color as BackgroundColor);
};

export const getBackgroundColor = (
  color?: BackgroundColor | string,
  defaultColor: BackgroundColor = "gray"
) => {
  return isBackgroundColor(color) ? color : defaultColor;
};

export const isForegroundColor = (color?: string): color is ForegroundColor => {
  return !!color && foregroundColors.includes(color as ForegroundColor);
};

export const getForegroundColor = (
  color?: ForegroundColor | string,
  defaultColor: ForegroundColor = "none"
) => {
  return isForegroundColor(color) ? color : defaultColor;
};
