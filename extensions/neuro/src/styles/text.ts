import { ColorMap } from "./color-map";
import { ForegroundColor } from "./styles";

export const textColors: ColorMap<ForegroundColor> = {
    none: {
      pressingOn: "text-neutral-600",
      on: "text-neutral-200",
    },
    yellow: {
      pressingOn: "text-yellow-600",
      on: "text-yellow-400",
    },
    red: {
      pressingOn: "text-red-600",
      on: "text-red-500",
    },
    orange: {
      pressingOn: "text-orange-600",
      on: "text-orange-500",
    },
  };