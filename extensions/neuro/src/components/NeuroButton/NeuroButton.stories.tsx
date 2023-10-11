// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/preact";
import FlashIcon from "@mdi/svg/svg/flash.svg";
import FireIcon from "@mdi/svg/svg/fire.svg";
import LightIcon from "@mdi/svg/svg/lightbulb.svg";

import { NeuroButton } from "./NeuroButton";
import { useState } from "preact/hooks";
import { foregroundColors, sizes } from "../../styles/styles";

const meta: Meta<typeof NeuroButton> = {
  component: NeuroButton,
};

export default meta;
type Story = StoryObj<typeof NeuroButton>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

export const Primary: Story = {
  args: {
    color: "red",
    round: true,
    size: "md",
  },
  argTypes: {
    color: {
      options: foregroundColors,
      control: { type: "select" },
    },
    size: {
      options: sizes,
      control: { type: "select" },
    },
  },
  render: ({ color, round, size }: any) => {
    const [isOn, setIsOn] = useState(false);
    const onClick = () => setIsOn((isOn) => !isOn);
    return (
      <div className="flex overflow-visible flex-wrap">
        <NeuroButton
          icon={({ className }) => (
            <FireIcon
              className={className}
              fill="currentColor"
              width="24px"
              height="24px"
            />
          )}
          size={size}
          round={round}
          isOn={isOn}
          onClick={onClick}
          background="gray"
          color={color}
          animate={{ type: "glow" }}
        />
        <NeuroButton
          icon={({ className }) => (
            <FireIcon
              className={className}
              fill="currentColor"
              width="24px"
              height="24px"
            />
          )}
          size={size}
          round={round}
          isOn={isOn}
          onClick={onClick}
          background="gray"
          color={color}
          animate={{ type: "glow" }}
          hideBorder
        />
        <NeuroButton
          icon={({ className }) => (
            <FireIcon
              className={className}
              fill="currentColor"
              width="24px"
              height="24px"
            />
          )}
          size={size}
          round={round}
          isOn={isOn}
          onClick={onClick}
          background="gray"
          color={color}
          animate={{ type: "glow", speed: 0.5 }}
          hideBorder
        />
        <NeuroButton
          icon={({ className }) => (
            <FireIcon
              className={className}
              fill="currentColor"
              width="24px"
              height="24px"
            />
          )}
          size={size}
          round={round}
          isOn={isOn}
          onClick={onClick}
          background="gray"
          color={color}
        />
        <NeuroButton
          icon={({ className }) => (
            <FireIcon
              className={className}
              fill="currentColor"
              width="24px"
              height="24px"
            />
          )}
          size={size}
          round={round}
          isOn={isOn}
          onClick={onClick}
          background="gray"
          color={color}
          animate={{ type: "pulse" }}
        />
        <NeuroButton
          round={round}
          isOn={isOn}
          onClick={onClick}
          icon={({ className }) => (
            <FlashIcon
              className={className}
              fill="currentColor"
              width="24px"
              height="24px"
            />
          )}
          size={size}
          background="gray"
          color={color}
          animate={{ type: "pulse" }}
          hideBorder
        />
        <NeuroButton
          round={round}
          isOn={isOn}
          onClick={onClick}
          size={size}
          icon={({ className }) => (
            <LightIcon
              className={className}
              fill="currentColor"
              width="24px"
              height="24px"
            />
          )}
          background="gray"
          color={color}
        />
      </div>
    );
  },
};
