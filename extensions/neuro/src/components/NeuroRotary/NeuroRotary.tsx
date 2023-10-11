import { ComponentChildren, ComponentProps } from "preact";
import classNames from "classnames";
import { BackgroundColor } from "../../styles/styles";
import { RotaryValueOptions, useRotaryValue } from "./hook";
import image from "./textures/egg-shell.png";
import Color from "colorjs.io";
import { useMemo } from "preact/hooks";
import { NeuroDot } from "./components/NeuroDot/NeuroDot";
import { cct } from "../../styles/cct";
import { useColorRange } from "../../styles/use-color-range";

export const colors = {
  red: {
    from: "#7f1d1d",
    to: "#dc2626",
  },
  yellow: {
    from: "#713f12",
    to: "#facc15"
  },
  green: {
    from: "#14532d",
    to: "#22c55e"
  },
  orange: {
    from: "#7c2d12",
    to: "#ea580c"
  },
  test: {
    from: "rebeccapurple",
    to: "lch(85% 100 85)",
  },
};

export interface NeuroRotaryProps extends RotaryValueOptions {
  color: keyof typeof colors | { from: string; to: string } | number;
  tickGradient?: boolean;
  background?: BackgroundColor;
  children?: ComponentChildren;
  textured?: boolean;
  tickCount?: number;
}


export const NeuroRotary = ({
  color,
  background,
  children,
  textured,
  tickGradient = true,
  ...rotaryOptions
}: NeuroRotaryProps) => {
  const { currentDegrees, onMouseDown, ticks, percentage } = useRotaryValue({
    ...rotaryOptions,
  });

  const { getHigh, getLow } = useColorRange(
    typeof color === "string"
      ? colors[color]
      : typeof color === "number"
      ? (() => {
          const lchColor = cct(color).to("lch");
          lchColor.lch["l"] = 2;
          return {
            from: lchColor,
            to: cct(color).to("lch"),
          };
        })()
      : color
  );

  return (
    <>
      <div
        style={{
          backgroundImage: textured ? `url('${image}')` : null,
        }}
        className="flex overflow-visible relative justify-center items-center p-16 bg-gray-800"
        onMouseDown={onMouseDown}
      >
        <div className="absolute top-0 bottom-0 left-1/2">
          {ticks.map(({ degrees, value, percentage: tickPercentage }) => {
            return (
              <div
                key={`tick-${degrees}-${value}`}
                id={`tick-${value}`}
                className="flex absolute justify-center items-end w-2 h-full rounded-full"
                style={{
                  top: 0,
                  left: "-4px",
                  transform: `rotate(${degrees}deg)`,
                }}
              >
                <NeuroDot
                  active={rotaryOptions.value >= value}
                  style={{ transform: `rotate(-${degrees}deg)` }}
                  colorHigh={getHigh(
                    tickGradient ? tickPercentage : percentage
                  )}
                  colorLow={getLow(tickGradient ? tickPercentage : percentage)}
                />
              </div>
            );
          })}
        </div>
        <div id="chamfered-edge" className="p-1 rounded-full neuro-inset">
          <div
            id="knob-inset"
            className="relative p-2 bg-gray-900 rounded-full neuro-inset neuro-shadow-sm"
          >
            <div
              id="knob-light"
              className="flex absolute inset-0 items-center p-3 rounded-full"
              style={{ transform: `rotate(${currentDegrees - 90}deg)` }}
            >
              <NeuroDot
                active
                style={{ transform: `rotate(-${currentDegrees - 90}deg)` }}
                colorHigh={getHigh(percentage)}
                colorLow={getLow(percentage)}
              />
            </div>
            {textured ? (
              <div
                id="knob-texture"
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundImage: `url('${image}')`,
                  transform: `rotate(${currentDegrees - 90}deg)`,
                }}
              >
                <div
                  className="p-12"
                  style={{ transform: `rotate(-${currentDegrees - 90}deg)` }}
                ></div>
              </div>
            ) : null}
            <div id="knob-shadow" className="p-[1px] neuro-convex rounded-full">
              <div
                id="knob-background"
                className="bg-gray-900 rounded-full border"
              >
                <div
                  id="knob-incline"
                  className="p-8 rounded-full neuro-convex neuro-shadow-sm"
                >
                  <div id="knob-inner-chamfered-edge" className="p-[1px] rounded-full neuro-inset neuro-shadow-xs border border-solid border-gray-800">
                    <div
                      id="knob-inner"
                      className="min-w-[8rem] min-h-[8rem] rounded-full neuro-inset neuro-shadow-xl [--shadow-end:theme(colors.gray.700/22%)]"
                    >
                      <div className="w-full h-full bg-black"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
