import { ComponentChildren, VNode } from "preact";
import { useState } from "preact/hooks";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { Size } from "../../styles/styles";
import { colors } from "../../styles/color-map";
import { useColorRange } from "../../styles/use-color-range";
import { useCallback } from "react";

const bgColors = {
  on: "neuro-concave neuro-shadow text-gray-200",
  off: "neuro-shadow neuro-shadow-sm hover:neuro-shadow-md text-gray-400",
  pressingOff: "neuro-concave text-gray-400",
  pressingOn: "neuro-concave text-gray-200",
};

export const textSizes = {
  xl: "text-xl",
  lg: "text-lg",
  md: "text-sm",
  sm: "text-xs",
  xs: "text-xs",
} satisfies { [key in Size]: string };

interface IconProps {
  className?: string;
  size: number;
}

export interface NeuroButtonProps {
  color: keyof typeof colors | string[] | number;
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
  children,
  animate,
  icon,
  isOn,
  onClick,
  hideBorder,
  size = "md",
  round,
}: NeuroButtonProps) => {
  const [isPressing, setIsPressing] = useState(false);
  const classesToApply = isPressing
    ? isOn
      ? "pressingOn"
      : "pressingOff"
    : isOn
    ? "on"
    : "off";

  const { getHigh, getLow } = useColorRange(
    typeof color === "string" ? colors[color] : color
  );

  const colorTopHigh = getHigh(1);
  const colorBottomHigh = getHigh(0);
  const colorTopLow = getLow(1);
  const colorBottomLow = getLow(0);

  const bgClasses = bgColors[classesToApply];
  const textClasses = [classesToApply];
  const roundClasses = round ? "rounded-full" : "rounded-xl";

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
              roundClasses,
              bgClasses,
              textClasses
            )
          )}
        >
          <div
            id="chamfered-edge"
            className={classNames("p-[1px]", roundClasses)}
          >
            <div
              id="knob-inset"
              className={classNames(
                "relative bg-gray-900 p-[1px]",
                roundClasses
              )}
              style={{
                background:
                  animate?.type === "glow" && isOn
                    ? `linear-gradient(145deg, ${colorTopHigh}, ${colorBottomLow})`
                    : undefined,
              }}
            >
              <div id="knob-incline">
                {isOn && animate?.type === "glow" ? (
                  <div
                    className={classNames(
                      roundClasses,
                      "overflow-visible absolute inset-0 p-1"
                    )}
                    style={{
                      boxShadow: `0 0 #0000, 0 0 #0000, 0 0 10px ${colorTopHigh}`,
                    }}
                  />
                ) : null}
                <div
                  id="knob-inner-chamfered-edge"
                  className={classNames(
                    animate?.type === "glow" && "p-1",
                    "neuro-shadow-xs",
                    roundClasses
                  )}
                  style={{
                    background:
                      animate?.type === "glow"
                        ? isOn
                          ? `linear-gradient(145deg, ${colorTopHigh}, ${colorBottomLow})`
                          : `linear-gradient(145deg, rgb(31 41 55), rgb(17 24 39))`
                        : undefined,
                  }}
                >
                  <div
                    className={classNames(roundClasses, {
                      "bg-gray-900": animate?.type === "glow",
                      " neuro-inset neuro-shadow-xl":
                        animate?.type === "glow" && isOn,
                    })}
                  >
                    <div
                      id="knob-incline"
                      className={classNames(
                        "transition-all relative",
                        animate?.type !== "glow" && "p-1",
                        roundClasses,
                        {
                          "neuro-inset neuro-shadow-xl": isPressing,
                          "neuro-convex neuro-shadow-xl": !isPressing && !isOn,
                          "neuro-concave neuro-shadow-xs": !isPressing && isOn,
                        }
                      )}
                    >
                      <div
                        id="knob-inner"
                        className={classNames(
                          "relative flex-1 flex justify-center items-center",
                          roundClasses,

                          {
                            "animate-pulse": isOn && animate?.type === "pulse",
                          },
                          size === "xl"
                            ? "p-10"
                            : size === "lg"
                            ? "p-8"
                            : size === "md"
                            ? "p-6"
                            : size === "sm"
                            ? "p-3"
                            : "p-1"
                        )}
                        style={{
                          color: isOn ? colorTopHigh.display() : undefined,
                        }}
                      >
                        {icon({ size: 24 })}
                        {children ? (
                          <div className={twMerge(classNames(textSizes[size]))}>
                            {children}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    </>
  );
};
