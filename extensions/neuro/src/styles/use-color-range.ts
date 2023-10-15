import Color from "colorjs.io";
import { useMemo } from "preact/hooks";
import { cct } from "./cct";
import { clamp } from "../utils/clamp";

type Range = ReturnType<typeof Color.range>;


const findRangeIndex = (ranges: Range[], percentage: number) => {
  const rangeSize = 1 / ranges.length;
  return Math.min(Math.floor(percentage / rangeSize), ranges.length - 1);
};

const convertPercentage = (ranges: Range[], percentage: number) => {
  const rangeSize = 1 / ranges.length;
  return (clamp(percentage) % rangeSize) / rangeSize;
};

export const getColorRanges = (colors: (string | number | Color)[]) => {
  return colors.slice(1).map((color, i) => {
    const previousColor = colors[i];
    const normalizedPreviousColor =
      typeof previousColor === "number" ? cct(previousColor) : previousColor!;
    const normalizedColor = typeof color === "number" ? cct(color) : color;
    return new Color(normalizedPreviousColor).range(normalizedColor, {
      space: "oklch", // interpolation space
      outputSpace: "srgb",
    });
  });
};

export const selectRange = (ranges: Range[], percentage: number) => {
  const rangeIndex = findRangeIndex(ranges, percentage);
  const convertedPercentage = convertPercentage(ranges, percentage);
  const range = ranges[rangeIndex]!;
  return range(convertedPercentage);
};

export const getHigh = (ranges: Range[], percentage: number) => {
  const color = selectRange(ranges, percentage).to("oklch");
  color.oklch["l"] += 0.1;
  return color.toString();
};
export const getLow = (ranges: Range[], percentage: number) =>
  selectRange(ranges, percentage).to("oklch").toString();

export const useColorRange = (colors: (string | number | Color)[] | number) => {
  const ranges = useMemo(() => {
    if (typeof colors === "number") {
      const lchColor = cct(colors).to("oklch");
      lchColor.oklch["l"] = 0.2;
      return getColorRanges([lchColor, cct(colors).to("oklch")]);
    }
    return getColorRanges(colors);
  }, [colors]);

  return {
    getLow: (percentage: number) => getHigh(ranges, percentage),
    getHigh: (percentage: number) => getLow(ranges, percentage),
  };
};
