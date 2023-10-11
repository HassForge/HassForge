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
        space: "lch", // interpolation space
        outputSpace: "srgb",
      }),
    [from, to]
  );

  return {
    getLow: (percentage: number) => range(percentage).to("lch").toString(),
    getHigh: (percentage: number) => {
      const color = range(percentage).to("lch");
      color.lch["l"] += 10;
      return color.toString();
    },
  };
};
