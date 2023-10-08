import { ComponentChildren, VNode } from "preact";
import { useState } from "preact/hooks";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import {
  BackgroundColor,
  ForegroundColor,
  Size,
  getBackgroundColor,
  getForegroundColor,
} from "../styles";

type ClassOption = "on" | "off" | "pressingOn" | "pressingOff";

type ColorMap<T extends string> = {
  [key in T]: {
    [key in ClassOption]?: string;
  };
};

// const bgColors: ColorMap<BackgroundColor> = {
//   gray: {
//     on: "hover:nm-concave-gray-800-xl nm-concave-gray-800-xl text-gray-200",
//     off: "hover:nm-flat-gray-800-lg nm-flat-gray-800 text-gray-400",
//     pressingOff: "hover:nm-concave-gray-800 nm-concave-gray-800 text-gray-600",
//     pressingOn: "hover:nm-convex-gray-800 nm-convex-gray-800 text-gray-200",
//   },
// };

const bgColors: ColorMap<BackgroundColor> = {
  gray: {
    on: "neuro-concave neuro-shadow neuro-shadow-lg hover:neuro-shadow-lg text-gray-200",
    off: "neuro-shadow neuro-shadow-sm hover:neuro-shadow-md text-gray-400",
    pressingOff: "neuro-concave neuro-shadow text-gray-400",
    pressingOn: "neuro-concave neuro-shadow neuro-shadow-md text-gray-200",
  },
};

const textColors: ColorMap<ForegroundColor> = {
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
  orange: {
    pressingOn: "border-orange-600",
    on: "border-orange-500",
    off: "border-transparent",
    pressingOff: "border-transparent",
  },
};

const glowColors: ColorMap<ForegroundColor> = {
  none: {
    pressingOn: "border-transparent",
    on: "border-transparent",
  },
  yellow: {
    pressingOn: `neuro-glow 
    [--glow-text-1:theme(colors.yellow.700)] 
    [--glow-text-2:theme(colors.yellow.700)] 
    [--glow-text-3:theme(colors.yellow.800)] 
    [--shadow-end:theme(colors.yellow.400/10%)] 
    [--shadow-start:theme(colors.yellow.700/22%)]`,
    on: `neuro-glow 
    [--glow-text-1:theme(colors.yellow.500)]
    [--glow-color-1-start:theme(colors.yellow.700/10%)] 
    [--glow-color-1-end:theme(colors.yellow.400/8%)] 
    
    [--glow-text-2:theme(colors.yellow.900)]
    [--glow-color-2-start:theme(colors.yellow.700/14%)] 
    [--glow-color-2-end:theme(colors.yellow.400/9%)] 
    
    [--glow-text-3:theme(colors.yellow.600)]
    [--glow-color-3-start:theme(colors.yellow.700/10%)] 
    [--glow-color-3-end:theme(colors.yellow.400/7%)] 
    `,
  },
  red: {
    pressingOn: `neuro-glow  neuro-shadow-lg
    [--glow-text-1:theme(colors.red.700)] 
    [--glow-text-2:theme(colors.red.950)] 
    [--glow-text-3:theme(colors.red.800)] 
    [--shadow-end:theme(colors.red.500/10%)] 
    [--shadow-start:theme(colors.red.950/22%)]`,
    on: `neuro-glow  neuro-shadow-md
    [--glow-text-1:theme(colors.red.500)]
    [--glow-color-1-start:theme(colors.red.950/20%)] 
    [--glow-color-1-end:theme(colors.red.500/10%)] 
    
    [--glow-text-2:theme(colors.red.900)]
    [--glow-color-2-start:theme(colors.red.950/18%)] 
    [--glow-color-2-end:theme(colors.red.500/8%)] 
    
    [--glow-text-3:theme(colors.red.600)]
    [--glow-color-3-start:theme(colors.red.950/30%)] 
    [--glow-color-3-end:theme(colors.red.500/12%)] 
    `,
  },
  orange: {
    pressingOn: `neuro-glow 
    [--glow-text-1:theme(colors.orange.700)] 
    [--glow-text-2:theme(colors.orange.950)] 
    [--glow-text-3:theme(colors.orange.800)] 
    [--shadow-end:theme(colors.orange.500/10%)] 
    [--shadow-start:theme(colors.orange.950/22%)]`,
    on: `neuro-glow 
    [--glow-text-1:theme(colors.orange.500)]
    [--glow-color-1-start:theme(colors.orange.950/24%)] 
    [--glow-color-1-end:theme(colors.orange.200/2%)] 
    
    [--glow-text-2:theme(colors.orange.900)]
    [--glow-color-2-start:theme(colors.orange.950/20%)] 
    [--glow-color-2-end:theme(colors.orange.200/3%)] 
    
    [--glow-text-3:theme(colors.orange.600)]
    [--glow-color-3-start:theme(colors.orange.950/26%)] 
    [--glow-color-3-end:theme(colors.orange.200/2%)] 
    `,
  },
};

export const outerSizeClasses = {
  xl: { round: "rounded-full", normal: "rounded-xl" },
  lg: { round: "rounded-full", normal: "rounded-xl" },
  md: { round: "rounded-full", normal: "rounded-xl" },
  sm: { round: "rounded-full", normal: "rounded-xl" },
} satisfies { [key in Size]: { round: string; normal: string } };

export const innerSizeClasses = {
  xl: { round: "py-16 px-16 flex-col rounded-full", normal: "rounded-xl py-16 px-16" },
  lg: { round: "py-8 px-8 flex-col rounded-full", normal: "rounded-xl py-8 px-8" },
  md: { round: "py-4 px-4 flex-col rounded-full", normal: "rounded-xl py-4 px-4" },
  sm: { round: "py-2 px-2 flex-col rounded-full", normal: "rounded-xl py-2 px-2" },
} satisfies { [key in Size]: { round: string; normal: string } };

export const textSizes = {
  xl: "text-xl",
  lg: "text-lg",
  md: "text-sm",
  sm: "text-xs",
} satisfies { [key in Size]: string };

interface IconProps {
  className?: string;
  size: number;
}

export interface NeuroButtonProps {
  color?: ForegroundColor;
  background?: BackgroundColor;
  icon: (props: IconProps) => VNode;
  animate?: { type: "pulse" } | { type: "glow"; speed?: number };
  isOn?: boolean;
  onClick?: () => void;
  size?: Size;
  hideBorder?: boolean;
  children?: ComponentChildren;
  round?: boolean;
}

export const NeuroButton = ({
  color,
  background,
  children,
  animate,
  icon,
  isOn,
  onClick,
  hideBorder,
  size = "md",
  round,
}: NeuroButtonProps) => {
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
  const borderClasses =
    borderColors[hideBorder ? "none" : foregroundColor]?.[classesToApply];
  const textClasses = textColors[foregroundColor]?.[classesToApply];
  const outerClasses = outerSizeClasses[size][round ? "round" : "normal"];
  const innerClasses = innerSizeClasses[size][round ? "round" : "normal"];
  return (
    <>
      <div className="flex overflow-visible justify-center items-center p-4 bg-gray-800">
        <button
          style={{
            [`--glow-speed`]:
              animate?.type === "glow" && animate.speed
                ? `${animate.speed}s`
                : undefined,
          }}
          onClick={onClick}
          onMouseDown={() => setIsPressing(true)}
          onMouseUp={() => setIsPressing(false)}
          onMouseLeave={() => setIsPressing(false)}
          className={twMerge(
            classNames(
              "flex overflow-visible transition-shadow",
              bgClasses,
              outerClasses,
              textClasses,
              {
                [glowColors[foregroundColor][classesToApply] ?? ""]:
                  animate?.type === "glow",
              }
            )
          )}
        >
          <div
            className={twMerge(
              classNames(
                "flex-1 flex justify-center items-center text-xs border-2 border-solid transition-all",
                {
                  "animate-pulse": isOn && animate?.type === "pulse",
                },
                innerClasses,
                borderClasses
              )
            )}
          >
            {icon({ size: 24 })}
            {children ? (
              <div className={twMerge(classNames(textSizes[size]))}>{children}</div>
            ) : null}
          </div>
        </button>
      </div>
    </>
  );
};
