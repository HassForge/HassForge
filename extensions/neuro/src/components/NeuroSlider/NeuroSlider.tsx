import { ComponentChildren } from "preact";
import { SliderValueOptions, useSliderValue } from "./hook";
import { useColorRange } from "../../styles/use-color-range";
import { colors } from "../../styles/color-map";

export interface NeuroSliderProps extends SliderValueOptions {
  color: keyof typeof colors | string[] | number;
  children?: ComponentChildren;
}

export const NeuroSlider = ({
  children,
  color,
  ...sliderOptions
}: NeuroSliderProps) => {
  const { knobStyle, ref, onMouseDown } = useSliderValue(sliderOptions);

  const { getHigh, getLow } = useColorRange(
    typeof color === "string" ? colors[color] : color
  );

  return (
    <div className="p-[1px] rounded-full neuro-convex">
      <div className="bg-gray-800 rounded-full">
        <div className="p-[2px] rounded-full neuro-convex neuro-shadow-sm">
          <div className="p-[1px] rounded-full neuro-inset neuro-shadow-xs border border-solid border-gray-800">
            <div className="rounded-full neuro-inset">
              <div
                className="relative w-64 h-4 rounded-full neuro-concave neuro-shadow-md"
                ref={ref}
                onMouseDown={onMouseDown}
              >
                <div
                  className="absolute top-0 bottom-0 left-0 rounded-full"
                  style={{
                    right: `calc(100% - ${knobStyle?.left}px)`,
                    background: `linear-gradient(to right, ${getHigh(0)}, ${
                      !knobStyle?.percentage
                        ? ""
                        : getHigh(knobStyle?.percentage / 100)
                    }`,
                  }}
                ></div>
                <div
                  className="absolute top-0 bottom-0 w-8 h-8 bg-gray-800 rounded-full"
                  style={{
                    ...knobStyle,
                    transform: `${knobStyle?.transform ?? ""} translateY(-25%)`,
                  }}
                >
                  <div className="relative w-full h-full">
                    <div className="absolute inset-[1px] rounded-full neuro-convex" />
                    <div className="absolute inset-[2px] rounded-full neuro-inset" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
