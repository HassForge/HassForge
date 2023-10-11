// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/preact";
import { NeuroRotary, colors } from "./NeuroRotary";
import { useState } from "preact/hooks";

const meta: Meta<typeof NeuroRotary> = {
  component: NeuroRotary,
};

export default meta;
type Story = StoryObj<typeof NeuroRotary>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

export const Primary: Story = {
  args: {
    color: "red",
    textured: false,
    sticky: false,
    tickCount: 20,
    degrees: 270,
    tickGradient: true,
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

  render: ({ color, textured, sticky, tickCount, degrees, tickGradient }: any) => {
    const [isOn, setIsOn] = useState(false);
    const onClick = () => setIsOn((isOn) => !isOn);
    const [value, setValue] = useState(0);
    return (
      <div className="flex overflow-visible flex-wrap flex-1 justify-center bg-gray-800">
        <NeuroRotary
          value={value}
          onChange={setValue}
          textured={textured}
          sticky={sticky}
          tickCount={tickCount}
          degrees={degrees}
          color={color}
          tickGradient={tickGradient}
        />
      </div>
    );
  },
};
