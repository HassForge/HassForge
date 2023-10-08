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
} from "../../styles/styles";

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
    on: "neuro-convex neuro-shadow neuro-shadow-xl text-gray-200",
    off: "neuro-shadow neuro-shadow-sm text-gray-400",
    pressingOff: "neuro-concave neuro-shadow text-gray-400",
    pressingOn: "neuro-convex neuro-shadow neuro-shadow-lg text-gray-200",
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
    pressingOn: "text-orange-600",
    on: "text-orange-500",
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
    [--glow-color-1-start:theme(colors.yellow.700/20%)] 
    [--glow-color-1-end:theme(colors.yellow.400/10%)] 
    
    [--glow-text-2:theme(colors.yellow.900)]
    [--glow-color-2-start:theme(colors.yellow.700/18%)] 
    [--glow-color-2-end:theme(colors.yellow.400/8%)] 
    
    [--glow-text-3:theme(colors.yellow.600)]
    [--glow-color-3-start:theme(colors.yellow.700/30%)] 
    [--glow-color-3-end:theme(colors.yellow.400/12%)] 
    `,
  },
  red: {
    pressingOn: `neuro-glow 
    [--glow-text-1:theme(colors.red.700)] 
    [--glow-text-2:theme(colors.red.950)] 
    [--glow-text-3:theme(colors.red.800)] 
    [--shadow-end:theme(colors.red.500/10%)] 
    [--shadow-start:theme(colors.red.950/22%)]`,
    on: `neuro-glow 
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
    [--glow-color-1-start:theme(colors.orange.950/20%)] 
    [--glow-color-1-end:theme(colors.orange.500/10%)] 
    
    [--glow-text-2:theme(colors.orange.900)]
    [--glow-color-2-start:theme(colors.orange.950/18%)] 
    [--glow-color-2-end:theme(colors.orange.500/8%)] 
    
    [--glow-text-3:theme(colors.orange.600)]
    [--glow-color-3-start:theme(colors.orange.950/30%)] 
    [--glow-color-3-end:theme(colors.orange.500/12%)] 
    `,
  },
};

export const sizes = {
  lg: {round: "w-32 h-32",normal: "p-16"},
  md: {round: "w-16 h-16",normal: "p-8"},
  sm: {round: "w-8 h-8",normal: "p-4"}
} satisfies {[key in Size]: {round: string, normal: string}}

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
  size = "md"
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
  const sizeClasses = sizes[size];
  return (
    <>
      <div className="flex justify-center items-center p-4 bg-gray-800">
        <button
          style={{
            [`--glow-speed`]:
              animate?.type === "glow" && animate.speed
                ? `${animate.speed}s`
                : undefined,
          }}
          className={twMerge(
            classNames(
              "flex rounded-full transition-shadow",
              bgClasses,
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
                sizeClasses,
                "flex-1 flex flex-col justify-center items-center text-xs rounded-full border-2 border-solid transition-all",
                {
                  "animate-pulse": isOn && animate?.type === "pulse",
                },
                borderClasses
              )
            )}
            onClick={onClick}
            onMouseDown={() => setIsPressing(true)}
            onMouseUp={() => setIsPressing(false)}
            onMouseLeave={() => setIsPressing(false)}
          >
            {icon({ size: 24 })}
            {children ? (
              <div className={twMerge(classNames("mt-2 text-lg"))}>
                {children}
              </div>
            ) : null}
          </div>
        </button>
      </div>
    </>
  );
};
