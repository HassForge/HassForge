import { HassComponent, HassPreactFunctionComponent } from "../types";
import {
  NeuroButton,
  NeuroButtonProps,
} from "../../components/NeuroButton/NeuroButton";
import css from "../../main.css";
import { useState } from "preact/hooks";

const ConnectedNeuroButton: HassPreactFunctionComponent<
  DeepPartial<Omit<NeuroButtonProps, "icon"> & { icon: string }>
> = ({ hass, config }) => {
  const [isOn, setIsOn] = useState(false);
  return (
    <>
      <style>{css}</style>
      <NeuroButton
        icon={(classes) => <ha-icon icon={config?.icon} class={classes} />}
        color={config?.color}
        background={config?.background}
        size={config?.size}
        round={config?.round}
        hideBorder={config?.hideBorder}
        isOn={isOn}
        onClick={() => setIsOn((isOn) => !isOn)}
        animate={
          config?.animate?.type === "pulse"
            ? { type: "pulse" }
            : config?.animate?.type === "glow"
            ? { type: "glow" }
            : undefined
        }
      />
    </>
  );
};

export const HassNeuroButton: HassComponent = {
  component: ConnectedNeuroButton,
  description: "A neumorphic round button",
  name: "neuro-button",
  preview: false,
  type: "neuro-button",
};
