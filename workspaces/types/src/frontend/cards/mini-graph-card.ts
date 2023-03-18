import { HACard } from "../card";

export const heatingColorThresholds: MiniGraphCardColorThresholds = [
  { value: 10, color: "#0284c7" },
  { value: 15, color: "#f39c12" },
  { value: 20, color: "#c0392b" },
];

export type MiniGraphCardColorThresholds = {
  value: number | string;
  color: string;
}[];

export type MiniGraphCardColorStateMap = {
  value: number | string;
  label: string;
}[];

export interface MiniGraphCardEntity {
  entity: string;
  attribute?: string;
  color?: string;
  show_line?: boolean;
  show_points?: boolean;
  show_legend?: boolean;
  y_axis?: string;
}

export interface MiniGraphCard extends HACard {
  type: "custom:mini-graph-card";
  name: string;
  entities: (string | MiniGraphCardEntity)[];
  show?: {
    labels: boolean;
  };
  line_width?: number;
  font_size?: number;
  smoothing?: boolean;
  hours_to_show?: number;
  points_per_hour?: number;
  color_thresholds_transition?: string;
  color_thresholds?: MiniGraphCardColorThresholds;
  state_map?: MiniGraphCardColorStateMap;
}
