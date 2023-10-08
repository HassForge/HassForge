import { ComponentChildren, VNode } from "preact";
import { useMemo, useState } from "preact/hooks";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import {
  BackgroundColor,
  ForegroundColor,
  Size,
  getBackgroundColor,
  getForegroundColor,
} from "../../styles/styles";
import { MouseEventHandler, useCallback } from "react";
import { RotaryValueOptions, useRotaryValue } from "./hook";
import image from "./textures/egg-shell.png";

export interface NeuroRotaryProps extends RotaryValueOptions {
  color?: ForegroundColor;
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
  tickCount = 20,
  ...rotaryOptions
}: NeuroRotaryProps) => {
  const {
    currentDegrees,
    onMouseDown,
    degrees,
    startAngle,
    endAngle,
    min,
    max,
  } = useRotaryValue({
    ...rotaryOptions,
  });

  const ticks = useMemo(() => {
    const incr = degrees / tickCount;
    const valueIncrement = max / tickCount;
    const ticks: { degrees: number; value: number }[] = [];
    let i = 0;
    for (let deg = startAngle; deg <= endAngle; deg += incr) {
      ticks.push({ degrees: deg, value: i * valueIncrement + min });
      i++;
    }
    console.log(ticks);
    return ticks;
  }, [degrees, tickCount, startAngle, endAngle, min, max]);

  return (
    <>
      <div
        style={{
          backgroundImage: textured ? `url('${image}')` : null,
        }}
        className="flex overflow-visible relative justify-center items-center p-12 pt-16 bg-gray-800"
        onMouseDown={onMouseDown}
      >
        <div className="absolute">
          {ticks.map(({ degrees, value }) => {
            return (
              <div
                key={`tick-${degrees}-${value}`}
                className="flex absolute justify-center items-end w-2 h-[8.5rem] rounded-full"
                style={{
                  top: "0px",
                  left: "-4px",
                  transform: `rotate(${degrees}deg)`,
                  transformOrigin: "top",
                }}
              >
                <div
                  className="relative p-1 m-2 rounded-full neuro-inset"
                  style={{ transform: `rotate(-${degrees}deg)` }}
                >
                  <div
                    className={classNames(
                      "relative p-1 rounded-full ",
                      {
                        "neuro-convex bg-red-400 [--convex-start:theme(colors.red.600)] [--convex-end:theme(colors.red.500)]":
                          rotaryOptions.value >= value,
                        "neuro-inset":
                          rotaryOptions.value < value,
                      }
                    )}
                  >
                    {rotaryOptions.value >= value ? (
                      <div className="absolute inset-0 p-1 overflow-visible shadow-[0_0_10px_theme(colors.red.500)] rounded-full" />
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="rounded-full p-[1px] neuro-inset">
          <div className="relative p-3 rounded-full bg-gray-950 neuro-inset neuro-shadow-xs">
            <div
              className="flex absolute inset-0 items-center p-3 rounded-full"
              style={{ transform: `rotate(${currentDegrees - 90}deg)` }}
            >
              <div
                className="relative p-1 m-2 rounded-full neuro-inset"
                style={{ transform: `rotate(-${currentDegrees - 90}deg)` }}
              >
                <div
                  className="relative p-1 bg-red-400 [--convex-start:theme(colors.red.600)] [--convex-end:theme(colors.red.300)] rounded-full neuro-convex"
                  style={{ transform: `rotate(${currentDegrees}deg)` }}
                >
                  <div className="absolute inset-0 p-1 overflow-visible shadow-[0_0_10px_theme(colors.red.500)] rounded-full" />
                </div>
              </div>
            </div>
            {textured ? (
              <div
                className="absolute p-8 rounded-full"
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
            <div className="bg-gray-900 rounded-full">
              <div className="p-8 rounded-full neuro-convex">
                <div className="w-24 h-24 rounded-full neuro-inset neuro-shadow-xl  border-solid border-gray-800 border-2 [--shadow-end:theme(colors.gray.700/22%)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
