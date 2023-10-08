import { HassComponent, HassPreactFunctionComponent } from "../types";
import {
  NeuroButton,
  NeuroButtonProps,
} from "../../components/NeuroButton/NeuroButton";

const ConnectedNeuroButton: HassPreactFunctionComponent<
  DeepPartial<NeuroButtonProps>
> = ({ hass, config }) => {
  return (
    <NeuroButton
      icon={(classes) => <ha-icon class={classes} />}
      color={config?.color}
      background={config?.background}
    />
  );
};

export const HassNeuroButton: HassComponent = {
  component: ConnectedNeuroButton,
  description: "A neumorphic round button",
  name: "neuro-button",
  preview: false,
  type: "neuro-button",
};
