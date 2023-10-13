import { precachedColors, precachedGradients } from "./color-range-cache";

function clampAndFindIndex(
  n: number,
  start: number,
  end: number,
  step: number
) {
  // Round the number to the nearest 0.25
  n = Math.round(n * 400) / 400;
  // Clamp the number between 0 and 100
  n = Math.max(start, Math.min(n, end));

  // Calculate the index in the array
  const index = Math.round((n - start) / step);

  return index;
}

export const useCachedColorRange = (colors: keyof typeof precachedColors) => {
  return {
    getLow: (percentage: number) => 
      precachedGradients[colors].lows[
        clampAndFindIndex(percentage, 0, 100, 0.25)
      ]!,
    getHigh: (percentage: number) =>
      precachedGradients[colors].highs[
        clampAndFindIndex(percentage, 0, 100, 0.25)
      ]!,
  };
};
