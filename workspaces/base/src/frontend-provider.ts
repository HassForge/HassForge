import { HACard } from "@hassforge/types";

export type CardGenerator = (...args: any[]) => HACard | HACard[];

export interface FrontendProvider {
  readonly components?: { [key: string]: CardGenerator };
  readonly cards?: CardGenerator[];
  readonly card?: CardGenerator;
}

export const isFrontendProvider = (x: any): x is FrontendProvider =>
  "cards" in x &&
  (typeof x.cards === "object" ||
    typeof x.card === "function" ||
    typeof x.components === "object");
