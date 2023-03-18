import { EntityID } from "../../id";

export interface SchedulerCardGroup {
  name: string;
  icon?: string;
  include?: EntityID[];
  exclude?: EntityID[];
}

export interface SchedulerCardActionVariable {
  name?: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  scale_factor?: number;
  optional?: boolean;
}

export interface SchedulerCardAction {
  service: string;
  name: string;
  icon?: string;
  service_data?: { [key: string]: boolean | number | string };
  variables?: { [key: string]: SchedulerCardActionVariable };
}

export interface SchedulerCardCustomization {
  actions?: SchedulerCardAction[];
  name?: string;
  icon?: string;
  exclude_actions?: string[];
  states?:
    | string[]
    | {
        unit?: string;
        min?: number;
        max?: number;
        step?: number;
      };
}

export type SchedulerCardCustomize = {
  [key: string]: SchedulerCardCustomization;
};

export interface SchedulerCard {
  type: "custom:scheduler-card";
  standard_configuration?: boolean;
  include?: EntityID[];
  exclude?: EntityID[];
  groups?: SchedulerCardGroup[];
  customize?: SchedulerCardCustomize;
  title?: string;
  sort_by?: string | string[];
  show_header_toggle?: boolean;
  show_add_button?: boolean;
  display_options?: {
    [key: string]: {
      icon?: string;
      primary_info: string | string[];
      secondary_info: string | string[];
    };
  };
}
