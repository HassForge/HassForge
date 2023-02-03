export interface Card {
  type: string;
}

///////// VERTICAL STACK CARD /////////

export interface VerticalStackCard extends Card {
  type: "custom:vertical-stack-in-card";
  title: string;
  cards: Card[];
}

///////// HORIZONTAL STACK CARD /////////

export interface HorizontalStackCard extends Card {
  type: "horizontal-stack";
  cards: Card[];
}

///////// ENTITY ROW CARD /////////

export interface EntityRowCardEntity {
  entity?: string;
  attribute?: string;
  name: string;
}

export interface EntityRowCard extends Card {
  type: "custom:multiple-entity-row";
  entity: string;
  icon: string;
  name: string;
  toggle: boolean;
  state_header?: string;
  entities: EntityRowCardEntity[];
}

///////// MINI GRAPH CARD /////////

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

export interface MiniGraphCard extends Card {
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
