import classNames from "classnames";
import css from "./Neuro7Segment.css?raw";
import { HTMLAttributes } from "preact/compat";

export interface Neuro7Segment {
  value: string;
  characterCount?: number;
  width?: number;
  containerClassName?: string;
  segmentOnClasses?: string;
  segmentOffClasses?: string;
  segmentOnStyle?: HTMLAttributes<HTMLDivElement>["style"];
  segmentOffStyle?: HTMLAttributes<HTMLDivElement>["style"];
}

/**
 * Index 0 corresponds to the top segment
 * Index 1 corresponds to the top right segment
 * Index 2 corresponds to the bottom right segment
 * Index 3 corresponds to the bottom segment
 * Index 4 corresponds to the bottom left segment
 * Index 5 corresponds to the top left segment
 * Index 6 corresponds to the middle segment.
 */
const characterMap = {
  // Existing map
  "0": [true, true, true, true, true, true, false],
  "1": [false, true, true, false, false, false, false],
  "2": [true, true, false, true, true, false, true],
  "3": [true, true, true, true, false, false, true],
  "4": [false, true, true, false, false, true, true],
  "5": [true, false, true, true, false, true, true],
  "6": [true, false, true, true, true, true, true],
  "7": [true, true, true, false, false, false, false],
  "8": [true, true, true, true, true, true, true],
  "9": [true, true, true, true, false, true, true],
  // Additional characters
  a: [true, true, true, false, true, true, true],
  b: [false, false, true, true, true, true, true],
  c: [false, false, false, true, true, false, true],
  d: [false, true, true, true, true, false, true],
  e: [true, false, false, true, true, true, true],
  f: [true, false, false, false, true, true, true],
  g: [true, true, true, true, false, true, true],
  h: [false, true, true, false, true, true, true],
  i: [false, true, true, false, false, false, false],
  j: [false, true, true, true, false, false, false],
  l: [false, false, false, true, true, true, false],
  n: [false, false, true, false, true, false, true],
  o: [false, false, true, true, true, false, true],
  p: [true, true, false, false, true, true, true],
  q: [true, true, true, false, false, true, true],
  r: [false, false, false, false, true, false, true],
  s: [true, false, true, true, false, true, true],
  t: [false, false, false, true, true, true, true],
  u: [false, true, true, true, true, true, false],
  v: [false, true, true, true, true, true, false], // V cannot be displayed, using U instead
  y: [false, true, true, true, false, true, true],
  z: [true, true, false, true, true, false, true], // Z cannot be displayed, using 2 instead
  A: [true, true, true, false, true, true, true],
  B: [false, false, true, true, true, true, true],
  C: [true, false, false, true, true, true, false],
  D: [false, true, true, true, true, false, true],
  E: [true, false, false, true, true, true, true],
  F: [true, false, false, false, true, true, true],
  G: [true, true, true, true, false, true, true],
  H: [false, false, true, false, true, true, true],
  I: [false, true, true, false, false, false, false],
  J: [false, true, true, true, false, false, false],
  K: [true, true, true, false, true, true, true], // K cannot be displayed, using A instead
  L: [false, false, false, true, true, true, false],
  M: [true, true, true, false, true, true, true], // M cannot be displayed, using A instead
  N: [false, true, true, false, true, false, true],
  O: [true, true, true, true, true, true, false],
  P: [true, true, false, false, true, true, true],
  Q: [true, true, true, true, false, true, true],
  R: [false, false, false, false, true, false, true],
  S: [true, false, true, true, false, true, true],
  T: [false, false, true, true, true, true, true],
  U: [false, true, true, true, true, true, false],
  V: [false, true, true, true, true, true, false], // V cannot be displayed, using U instead
  Y: [false, true, true, true, false, true, true],
  Z: [true, true, false, true, true, false, true], // Z cannot be displayed, using 2 instead,
  "-": [false, false, false, false, false, false, true],
  "=": [false, false, false, true, false, false, true],
  "'": [false, false, false, false, false, true, false],
  '"': [false, true, false, false, false, true, false],
  _: [false, false, false, true, false, false, false],
};

export type SeventSegmentCharacter =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "-";

export const Neuro7Segment = ({
  value,
  width = 4,
  containerClassName,
  segmentOnClasses = "bg-red-500",
  segmentOffClasses = "bg-gray-800",
  segmentOnStyle,
  segmentOffStyle,
  characterCount,
}: Neuro7Segment) => {
  const characters = [...value] as SeventSegmentCharacter[];
  const segmentCount = characterCount
    ? Array.from(Array(characterCount).keys())
    : Array.from(Array(characters.length).keys());
  return (
    <div
      className={classNames(
        "flex justify-center items-center",
        containerClassName
      )}
    >
      <style>{css}</style>
      {segmentCount.map((characterIndex) => {
        const character = characters[characterIndex as number] ?? "";
        return (
          <div
            key={`segment-${characterIndex}`}
            class="s7s"
            title={character}
            style={{
              "--padding-p": `${width / 8}px`,
              "--bar-w": `${width}px`,
              "--bar-pad": `${width / 4}px`,
            }}
          >
            {Array.from(Array(7).keys()).map((segmentIndex) => {
              const isOn =
                character && characterMap[character]?.[segmentIndex] === true;

              return (
                <div
                  key={`char-${characterIndex}-${segmentIndex}`}
                  className={classNames(
                    `segment`,
                    isOn ? segmentOnClasses : segmentOffClasses
                  )}
                  style={isOn ? segmentOnStyle : segmentOffStyle}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
