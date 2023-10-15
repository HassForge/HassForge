// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/preact";
import { NeuroSlider } from "./NeuroSlider";
import { useState } from "preact/hooks";
import { colors } from "../../styles/color-map";

const meta: Meta<typeof NeuroSlider> = {
  component: NeuroSlider,
};

export default meta;
type Story = StoryObj<typeof NeuroSlider>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

export const Primary: Story = {
  args: {
    color: "red",
    vertical: false,
    textured: false,
    sticky: false,
    tickCount: 20,
    degrees: 270,
    min: 0,
    max: 100,
    tickGradient: true,
    text: "Hello",
  },
  argTypes: {
    color: {
      options: [...Object.keys(colors), 3000, 4000, 5000, 6000, 12000],
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

  render: ({ min, max, vertical, color }: any) => {
    const [isOn, setIsOn] = useState(false);
    const onClick = () => setIsOn((isOn) => !isOn);
    const [value, setValue] = useState(min);
    return (
      <div className="flex overflow-visible flex-wrap flex-1 justify-center bg-gray-800">
        <NeuroSlider
          value={value}
          color={color}
          onChange={setValue}
          vertical={vertical}
        ></NeuroSlider>
      </div>
    );
  },
};
