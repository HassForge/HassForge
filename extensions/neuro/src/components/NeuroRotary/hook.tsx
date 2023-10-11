import { useCallback, useMemo } from "preact/hooks";

const convertRange = (
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number,
  oldValue: number
) => {
  return ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
};
const getDegrees = (
  startAngle: number,
  endAngle: number,
  cX: number,
  cY: number,
  pts: { x: number; y: number }
) => {
  const x = cX - pts.x;
  const y = cY - pts.y;
  let deg = (Math.atan(y / x) * 180) / Math.PI;
  if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
    deg += 90;
  } else {
    deg += 270;
  }
  let finalDeg = Math.min(Math.max(startAngle, deg), endAngle);
  return finalDeg;
};

export interface RotaryValueOptions {
  min?: number;
  max?: number;
  degrees?: number;
  value: number;
  tickCount?: number;
  onChange: (value: number) => void;
  sticky?: boolean; // And here
}

export const useRotaryValue = ({
  degrees = 270,
  max = 100,
  min = 0,
  tickCount = 20,
  onChange,
  value,
  sticky = false,
}: RotaryValueOptions) => {
  const { currentDegrees, endAngle, startAngle } = useMemo(() => {
    const startAngle = (360 - degrees) / 2;
    const endAngle = startAngle + degrees;
    return {
      startAngle,
      endAngle,
      currentDegrees: Math.floor(
        convertRange(min, max, startAngle, endAngle, value)
      ),
    };
  }, [degrees, min, max, value]);

  const ticks = useMemo(() => {
    const incr = degrees / tickCount;
    const valueIncrement = max / tickCount;
    const ticks: { degrees: number; value: number; percentage: number }[] = [];
    let i = 0;
    for (let deg = startAngle; deg <= endAngle; deg += incr) {
      ticks.push({
        degrees: deg,
        value: i * valueIncrement + min,
        percentage: i / tickCount,
      });
      i++;
    }
    return ticks;
  }, [degrees, tickCount, startAngle, endAngle, min, max]);
  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      const knob = (e.target as HTMLElement)?.getBoundingClientRect();
      const pts = {
        x: knob.left + knob.width / 2,
        y: knob.top + knob.height / 2,
      };

      const moveHandler = (e: MouseEvent) => {
        let currentDegrees = getDegrees(
          startAngle,
          endAngle,
          e.clientX,
          e.clientY,
          pts
        );
        if (currentDegrees === startAngle) currentDegrees--;

        if (sticky) {
          let closestTick = ticks.reduce((prev, curr) =>
            Math.abs(curr.degrees - currentDegrees) <
            Math.abs(prev.degrees - currentDegrees)
              ? curr
              : prev
          );
          currentDegrees = closestTick.degrees;
        }

        let newValue = Math.floor(
          convertRange(startAngle, endAngle, min, max, currentDegrees)
        );
        onChange?.(newValue);
      };
      document.addEventListener("mousemove", moveHandler);
      document.addEventListener("mouseup", () =>
        document.removeEventListener("mousemove", moveHandler)
      );
    },
    [ticks]
  );

  return {
    onMouseDown,
    currentDegrees,
    degrees,
    startAngle,
    endAngle,
    min,
    max,
    ticks,
    percentage: value / max,
    transform: `rotate(${currentDegrees}deg)`,
  };
};
