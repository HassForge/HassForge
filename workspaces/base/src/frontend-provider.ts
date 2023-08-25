import { HACard } from "@hassbuilder/types";

export type CardGenerator = (...args: any[]) => HACard | HACard[];

export interface FrontendProvider {
  readonly cards?: { [key: string]: CardGenerator };
}