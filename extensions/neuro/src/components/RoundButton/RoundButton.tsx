import { ComponentChildren, VNode } from "preact";
import { useState } from "preact/hooks";
import classNames from "classnames";
import { tailwindStyles } from "../../load-css";
import {
  BackgroundColor,
  ForegroundColor,
  getBackgroundColor,
  getForegroundColor,
} from "../styles";

type ClassOption = "on" | "off" | "pressingOn" | "pressingOff";

type ColorMap<T extends string> = {
  [key in T]: {
    [key in ClassOption]?: string;
  };
};

const bgColors: ColorMap<BackgroundColor> = {
  gray: {
    on: "hover:nm-concave-gray-800-xl nm-concave-gray-800-xl text-gray-200",
    off: "hover:nm-flat-gray-800-lg nm-flat-gray-800 text-gray-400",
    pressingOff: "hover:nm-concave-gray-800 nm-concave-gray-800 text-gray-600",
    pressingOn: "hover:nm-convex-gray-800 nm-convex-gray-800 text-gray-200",
  },
};

const iconColors: ColorMap<ForegroundColor> = {
  none: {
    pressingOn: "text-neutral-600",
    on: "text-neural-400",
  },
  yellow: {
    pressingOn: "text-yellow-600",
    on: "text-yellow-400",
  },
  red: {
    pressingOn: "text-red-600",
    on: "text-red-500",
  },
};

const textColors: ColorMap<ForegroundColor> = {
  none: {
    pressingOn: "text-neutral-600",
    on: "text-neural-400",
  },
  yellow: {
    pressingOn: "text-yellow-600",
    on: "text-yellow-400",
  },
  red: {
    pressingOn: "text-red-600",
    on: "text-red-500",
  },
};

const borderColors: ColorMap<ForegroundColor> = {
  none: {
    pressingOn: "border-transparent",
    on: "border-transparent",
    off: "border-transparent",
    pressingOff: "border-transparent",
  },
  yellow: {
    pressingOn: "border-yellow-600",
    on: "border-yellow-400",
    off: "border-transparent",
    pressingOff: "border-transparent",
  },
  red: {
    pressingOn: "text-red-600",
    on: "text-red-500",
    off: "border-transparent",
    pressingOff: "border-transparent",
  },
};

export interface RoundButtonProps {
  color?: ForegroundColor;
  background?: BackgroundColor;
  icon: (classes: string) => VNode;
  pulse?: boolean;
  isOn?: boolean;
  onClick?: () => void;
  children?: ComponentChildren;
}

export const RoundButton = ({
  color,
  background,
  children,
  pulse,
  icon,
  isOn,
  onClick,
}: RoundButtonProps) => {
  const foregroundColor = getForegroundColor(color);
  const backgroundColor = getBackgroundColor(background);
  const [isPressing, setIsPressing] = useState(false);

  const classesToApply = isPressing
    ? isOn
      ? "pressingOn"
      : "pressingOff"
    : isOn
    ? "on"
    : "off";
  const bgClasses = bgColors[backgroundColor]?.[classesToApply];
  const fgClasses = borderColors[foregroundColor]?.[classesToApply];
  const textClasses = textColors[foregroundColor]?.[classesToApply];
  const iconClasses = iconColors[foregroundColor]?.[classesToApply];
  return (
    <>
      {tailwindStyles}
      <div className="flex justify-center items-center w-64 h-64 bg-gray-800">
        <div
          className={classNames(
            "flex flex-col justify-center items-center text-xs rounded-full border-2 border-solid transition-all",
            pulse && isOn && "animate-pulse",
            bgClasses,
            fgClasses
          )}
          onClick={onClick}
          onMouseDown={() => setIsPressing(true)}
          onMouseUp={() => setIsPressing(false)}
          onMouseLeave={() => setIsPressing(false)}
        >
          {icon(classNames(iconClasses))}
          {children ? (
            <div className={classNames("mt-2 text-lg", textClasses)}>
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
