import { HASensor } from "@hassforge/types";
import { HistoryStatsSensor } from "./history-stats";

export * from "./history-stats";

export const isCreatableSensor = (x: unknown): x is HASensor =>
  x instanceof HistoryStatsSensor;
