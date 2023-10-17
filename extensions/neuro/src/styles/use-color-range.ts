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
  console.log("converted", ranges.length, rangeIndex, convertedPercentage);
  const range = ranges[rangeIndex]!;
  return range(convertedPercentage);
};

export const getHigh = (ranges: Range[], percentage: number) => {
  const color = selectRange(ranges, percentage).to("oklch");
  color.oklch["l"] += 0.1;
  return color;
};

export const getLow = (ranges: Range[], percentage: number) =>
  selectRange(ranges, percentage).to("oklch");

export const linearGradientSteps = (ranges: Range[], percentage: number) => {
  const rangeIndex = findRangeIndex(ranges, percentage);
  let gradientSteps = [];

  let percentageLeft = 0;

  for (let i = 0; i <= rangeIndex; i++) {
    
    const color = selectRange(ranges, i / ranges.length).to("oklch");
    console.log(i, (i / ranges.length) * 100, i / ranges.length, color.to('srgb').toString());
    gradientSteps.push({ color: color, position: (i / ranges.length) * 100 });
  }

  // Add the final color at the percentage
  console.log('selecting range', percentage)
  const finalColor = selectRange(ranges, percentage).to("oklch");
  gradientSteps.push({ color: finalColor, position: percentage * 100 });


  // Convert the gradient steps to a string
  return gradientSteps
    .map((step) => `${step.color} ${step.position}%`)
    .join(", ");
};

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
    getLow: (percentage: number) => getLow(ranges, percentage),
    getHigh: (percentage: number) => getHigh(ranges, percentage),
    linearGradientSteps: (percentage: number) =>
      linearGradientSteps(ranges, percentage),
  };
};
