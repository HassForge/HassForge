// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/preact";
import FlashIcon from "@mdi/svg/svg/flash.svg";
import FireIcon from "@mdi/svg/svg/fire.svg";
import LightIcon from "@mdi/svg/svg/lightbulb.svg";

import { NeuroButton2 } from "./NeuroButton2";
import { useState } from "preact/hooks";
import { foregroundColors, sizes } from "../../styles/styles";
import { colors } from "../../styles/color-map";

const meta: Meta<typeof NeuroButton2> = {
  component: NeuroButton2,
};

export default meta;
type Story = StoryObj<typeof NeuroButton2>;

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
      options: [...Object.keys(colors), 3000, 4000, 5000, 6000, 12000],
      control: { type: "select" },
    },
    size: {
      options: sizes,
      control: { type: "select" },
    },
  },
  parameters: {
    backgrounds: {
      default: "gray",
      values: [
        {
          name: "gray",
          value: "rgb(31 41 55)",
        },
        {
          name: "facebook",
          value: "#3b5998",
        },
      ],
    },
  },
  render: ({ color, round, size }: any) => {
    const [isOn, setIsOn] = useState(false);
    const onClick = () => setIsOn((isOn) => !isOn);
    return (
      <div className="flex overflow-visible flex-wrap">
        <NeuroButton2
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
          color={color}
          animate={{ type: "glow" }}
        />
        <NeuroButton2
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
          color={color}
          animate={{ type: "glow" }}
          hideBorder
        />
        <NeuroButton2
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
          color={color}
          animate={{ type: "glow", speed: 0.5 }}
          hideBorder
        />
        <NeuroButton2
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
          color={color}
        />
        <NeuroButton2
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
          color={color}
          animate={{ type: "pulse" }}
        />
        <NeuroButton2
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
          color={color}
          animate={{ type: "pulse" }}
          hideBorder
        />
        <NeuroButton2
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
          color={color}
        />
      </div>
    );
  },
};
