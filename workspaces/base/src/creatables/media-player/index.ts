import { HAMediaPlayer } from "@hassforge/types";
import { UniversalMediaPlayer } from "./universal";

export * from "./universal";

export const isCreatableMediaPlayer = (x: unknown): x is HAMediaPlayer =>
  x instanceof UniversalMediaPlayer;
