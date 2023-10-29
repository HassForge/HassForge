import classNames from "classnames";
import { ComponentChildren } from "preact";

export interface SectionProps {
  title: string;
  children?: ComponentChildren;
  orientation?: "top-to-bottom" | "upright" | "bottom-to-top";
  textPosition?: "right" | "left";
}

export const Section = ({
  title,
  children,
  orientation = "top-to-bottom",
  textPosition = "left",
}: SectionProps) => {
  const classes = {
    "vertical-writing-rl orientation-upright ":
      orientation === "upright",
    "vertical-writing-rl": orientation === "top-to-bottom",
    "vertical-writing-lr [--shadow-angle:35deg]":
      orientation === "bottom-to-top",
  };

  const text = (
    <div className="flex relative justify-center items-center">
      <div
        className={classNames(
          "relative mt-3",
          classes,
          "[--convex-start:#4b5563] [--convex-end:#111827]",
          {
            "rotate-180 [--shadow-angle:325deg]": orientation === "bottom-to-top",
          }
        )}
      >
        {title.split("").map((char) => {
          return (
            <span
              className={classNames(
                "text-4xl font-bold text-transparent neuro-shadow-text neuro-convex-text neuro-shadow-1px"
              )}
            >
              {char}
            </span>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="flex">
      {text && textPosition === "left" ? text : undefined}
      <div> {children}</div>
      {text && textPosition === "right" ? text : undefined}
    </div>
  );
};
