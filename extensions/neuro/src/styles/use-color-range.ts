import Color from "colorjs.io";
import { useMemo } from "preact/hooks";

export const useColorRange = ({
  from,
  to,
}: {
  from: string | Color;
  to: string | Color;
}) => {
  const range = useMemo(
    () =>
      new Color(from).range(to, {
        space: "oklch", // interpolation space
        outputSpace: "srgb",
      }),
    [from, to]
  );

  return {
    getLow: (percentage: number) => range(percentage).to("oklch").toString(),
    getHigh: (percentage: number) => {
      const color = range(percentage).to("oklch");
      color.oklch["l"] += 0.1;
      return color.toString();
    },
  };
};
