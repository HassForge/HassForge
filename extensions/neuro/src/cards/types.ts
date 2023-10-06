import { HomeAssistant } from "custom-card-helpers";
import { FunctionComponent } from "preact";

export type HassPreactFunctionComponent<Config extends object = {}> = FunctionComponent<{
  hass: HomeAssistant;
  config?: Config;
}>;

export interface HassComponent {
  type: string;
  name: string;
  preview: boolean;
  description: string;
  component: HassPreactFunctionComponent;
}
