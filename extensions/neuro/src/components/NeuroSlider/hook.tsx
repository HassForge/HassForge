import { useCallback, useMemo, useRef } from "preact/hooks";
import { clamp } from "../../utils/clamp";

export interface SliderValueOptions {
  min?: number;
  max?: number;
  value: number;
  tickCount?: number;
  onChange: (value: number) => void;
  sticky?: boolean;
  vertical?: boolean;
}

export const useSliderValue = ({
  min = 0,
  max = 100,
  value,
  tickCount = 20,
  onChange,
  sticky,
  vertical = false,
}: SliderValueOptions) => {
  const ref = useRef<HTMLDivElement>(null);

  const knobStyle = useMemo(() => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const range = max - min;
    const percentage = ((value - min) / range) * 100;
    if (vertical) {
      const absValue = ((value - min) / range) * rect.height;
      return { top: absValue, percentage, transform: `translateY(-${percentage}%)` };
    } else {
      const absValue = ((value - min) / range) * rect.width;
      return { left: absValue, percentage, transform: `translateX(-${percentage}%)` };
    }
  }, [min, max, value]);

  const ticks = useMemo(() => {
    const ticks: { value: number; percentage: number }[] = [];
    for (let i = 0; i < tickCount; i++) {
      const percentage = i / (tickCount - 1);
      const value = min + percentage * (max - min);
      ticks.push({
        value,
        percentage,
      });
    }
    return ticks;
  }, [tickCount, min, max]);

  const onMouseDown = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const knob = ref.current?.getBoundingClientRect();
      if (!knob) return;

      const moveHandler = (e: MouseEvent | TouchEvent) => {
        let clientX, clientY;
        if (e instanceof TouchEvent) {
          clientX = e.touches[0]?.clientX ?? 0;
          clientY = e.touches[0]?.clientY ?? 0;
        } else {
          clientX = (e as MouseEvent).clientX;
          clientY = (e as MouseEvent).clientY;
        }
        if (vertical) {
          value = clamp(
            ((clientY - knob.top) / knob.height) * (max - min) + min,
            min,
            max
          );
        } else {
          value = clamp(
            ((clientX - knob.left) / knob.width) * (max - min) + min,
            min,
            max
          );
        }
        if (sticky) {
          value = ticks.reduce((prev, curr) =>
            Math.abs(curr.value - value) < Math.abs(prev.value - value)
              ? curr
              : prev
          ).value;
        }
        onChange?.(value);
      };
      document.addEventListener("mousemove", moveHandler);
      document.addEventListener("touchmove", moveHandler);
      document.addEventListener("mouseup", () =>
        document.removeEventListener("mousemove", moveHandler)
      );
      document.addEventListener("touchend", () =>
        document.removeEventListener("touchmove", moveHandler)
      );
    },
    [ticks]
  );

  return {
    onMouseDown,
    ref,
    knobStyle,
  };
};
