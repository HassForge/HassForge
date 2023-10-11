import { HassComponent, HassPreactFunctionComponent } from "../types";
import {
  NeuroRotary,
  NeuroRotaryProps,
} from "../../components/NeuroRotary/NeuroRotary";
import { useState } from "react";
import css from "../../main.css";

const ConnectedNeuroRotary: HassPreactFunctionComponent<
  DeepPartial<NeuroRotaryProps>
> = ({ hass, config }) => {
  const [value, setValue] = useState(50);
  return (
    <>
      <style>{css}</style>
      <NeuroRotary
        value={value}
        onChange={setValue}
        color={config?.color}
        background={config?.background}
      />
    </>
  );
};

export const HassNeuroRotary: HassComponent = {
  component: ConnectedNeuroRotary,
  description: "A neumorphic rotary dial",
  name: "neuro-rotary",
  preview: false,
  type: "neuro-rotary",
};
