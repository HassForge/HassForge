import { getColorRanges, getHigh, getLow, useColorRange } from "./use-color-range";

export const precachedColors = {
  red: ["#7f1d1d", "#dc2626"],
  yellow: ["#713f12", "#facc15"],
  green: ["#14532d", "#22c55e"],
  orange: ["#7c2d12", "#ea580c"],
  heating: ["blue", "white", "red"],
  test: ["rebeccapurple", "red", "oklch(85% 0.18 85)", "blue"],
};

function generateArray(start: number, end: number, step: number) {
  const length = Math.floor((end - start) / step) + 1;
  return Array.from({ length }, (_, i) => start + i * step);
}

const arr = generateArray(0, 100, 0.25);

export const precachedGradients = Object.entries(precachedColors).reduce(
  (prev, [key, colors]) => {
    const ranges = getColorRanges(colors);
    const highs = arr.map(i => getHigh(ranges, i));
    const lows = arr.map(i => getLow(ranges, i));
    return {
      ...prev,
      [key]: { highs, lows },
    };
  },
  {} as {
    [key in keyof typeof precachedColors]: { highs: string[]; lows: string[] };
  }
);
