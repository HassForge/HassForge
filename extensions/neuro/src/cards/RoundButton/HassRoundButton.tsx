import { HassComponent, HassPreactFunctionComponent } from "../types";
import {
  RoundButton,
  RoundButtonProps,
} from "../../components/RoundButton/RoundButton";

const ConnectedRoundButton: HassPreactFunctionComponent<
  DeepPartial<RoundButtonProps>
> = ({ hass, config }) => {
  return (
    <RoundButton
      icon={(classes) => <ha-icon class={classes} />}
      color={config?.color}
      background={config?.background}
    />
  );
};

export const HassRoundButton: HassComponent = {
  component: ConnectedRoundButton,
  description: "A neumorphic round button",
  name: "neuro-round-button",
  preview: false,
  type: "neuro-round-button",
};
