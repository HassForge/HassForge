import { HASensorGroup } from "./group";
import { HAHistoryStatsSensor } from "./history-stats";

export * from "./device-class";
export * from "./history-stats";
export * from "./group";

export type HASensor = HASensorGroup | HAHistoryStatsSensor;
