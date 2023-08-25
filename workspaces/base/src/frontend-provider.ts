import { HACard } from "@hassforge/types";

export type CardGenerator = (...args: any[]) => HACard | HACard[];

export interface FrontendProvider {
  readonly cards?: { [key: string]: CardGenerator };
}

export const isFrontendProvider = (x: any): x is FrontendProvider =>
  "cards" in x && typeof x.cards === "object";
