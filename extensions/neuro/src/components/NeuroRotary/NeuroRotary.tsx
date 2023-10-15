import { ComponentChildren } from "preact";
import { BackgroundColor } from "../../styles/styles";
import { RotaryValueOptions, useRotaryValue } from "./hook";
import image from "./textures/egg-shell.png";
import { NeuroDot } from "./components/NeuroDot/NeuroDot";
import { useColorRange } from "../../styles/use-color-range";
import { Neuro7Segment } from "../Neuro7Segment/Neuro7Segment";
import { Font } from "../../styles/font";
import { colors } from "../../styles/color-map";

export interface NeuroRotaryProps extends RotaryValueOptions {
  color: keyof typeof colors | string[] | number;
  tickGradient?: boolean;
  background?: BackgroundColor;
  children?: ComponentChildren;
  textured?: boolean;
  tickCount?: number;
  display?: { show: boolean; minCharCount?: number; glow?: boolean };
}

export const NeuroRotary = ({
  color,
  background,
  children,
  textured,
  tickGradient = true,
  display = { show: true, glow: true },
  ...rotaryOptions
}: NeuroRotaryProps) => {
  const { currentDegrees, onMouseDown, ticks, percentage } = useRotaryValue({
    ...rotaryOptions,
  });

  const { getHigh, getLow } = useColorRange(
    typeof color === "string" ? colors[color] : color
  );

  return (
    <>
      <div className="mt-16">
        <Font />
        <div
          style={{
            backgroundImage: textured ? `url('${image}')` : null,
          }}
          className="flex overflow-visible relative justify-center items-center p-16 -mt-16 bg-gray-800"
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
                    colorLow={getLow(
                      tickGradient ? tickPercentage : percentage
                    )}
                  />
                </div>
              );
            })}
          </div>
          <div
            id="chamfered-edge"
            className="p-1 rounded-full neuro-inset"
            onTouchStart={onMouseDown}
          >
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
                  className="absolute inset-0 rounded-full pointer-events-none touch-none"
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
              <div
                id="knob-shadow"
                className="p-[1px] neuro-convex rounded-full"
              >
                <div
                  id="knob-background"
                  className="bg-gray-900 rounded-full border"
                >
                  <div
                    id="knob-incline"
                    className="p-8 rounded-full neuro-convex neuro-shadow-sm"
                  >
                    <div
                      id="knob-inner-chamfered-edge"
                      className="p-[1px] rounded-full neuro-inset neuro-shadow-xs border border-solid border-gray-800"
                    >
                      <div
                        id="knob-inner"
                        className="min-w-[8rem] min-h-[8rem] relative rounded-full neuro-inset neuro-shadow-xl [--shadow-end:theme(colors.gray.700/22%)]"
                      >
                        {display ? (
                          <div className="flex absolute inset-0 justify-center rounded-full bg-black/90 neuro-inset neuro-shadow-xl align-center">
                            <Neuro7Segment
                              width={4}
                              value={Math.floor(rotaryOptions.value).toString()}
                              segmentOffClasses="bg-gray-800/20"
                              segmentOnStyle={{
                                "--convex-start": getHigh(percentage),
                                "--convex-end": getLow(percentage),
                                boxShadow: display.glow
                                  ? `0 0 #0000, 0 0 #0000, 0 0 10px ${getHigh(
                                      percentage
                                    )}`
                                  : undefined,
                              }}
                              segmentOnClasses={"neuro-convex neuro-shadow-xs"}
                              characterCount={display.minCharCount}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex relative z-10 justify-center items-center -mt-16">
          <div className="relative mt-3">
            <div className="relative text-5xl font-bold text-gray-800 neuro-shadow-text neuro-shadow-1px">
              {children}
            </div>
            <div className="absolute inset-0 text-5xl font-bold text-transparent neuro-convex-text neuro-shadow-1px">
              {children}
            </div>
          </div>
          {/* <div className="py-4 text-4xl font-bold text-gray-800 neuro-shadow-text neuro-shadow-xs">{children}</div> */}
        </div>
      </div>
    </>
  );
};
