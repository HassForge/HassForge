export interface HAHistoryStatsSensor {
  platform: "history_stats";
  name: string;
  entity_id: string;
  state: string;
  type: string;
  start?: string;
  end?: string;
  duration?: {
    minutes?: number;
    seconds?: number;
    hours?: number;
    days?: number;
  };
}
