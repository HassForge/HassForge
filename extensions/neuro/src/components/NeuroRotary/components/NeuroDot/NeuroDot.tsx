import classNames from "classnames";
import { ComponentProps } from "preact";

export const NeuroDot = ({
  active,
  colorLow,
  colorHigh,
  ...divProps
}: {
  active: boolean;
  colorLow: string;
  colorHigh: string;
} & ComponentProps<"div">) => {
  return (
    <div
      className="relative p-[1px] m-2 rounded-full neuro-inset [--shadow-size:0.05em] "
      {...divProps}
    >
      <div className="relative rounded-full neuro-inset neuro-shadow-lg">
        <div className={classNames("relative rounded-full p-[1px]")}>
          <div
            className={classNames([
              "p-1 flex justify-center align-center rounded-full",
              active && "neuro-convex neuro-shadow-xl",
            ])}
            style={{
              "--convex-start": colorLow,
              "--convex-end": colorHigh,
            }}
          ></div>
          {active ? (
            <div
              className="overflow-visible absolute inset-0 p-1 rounded-full"
              style={{
                boxShadow: `0 0 #0000, 0 0 #0000, 0 0 10px ${colorHigh}`,
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
