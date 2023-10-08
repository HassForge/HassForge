// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/preact";
import { NeuroRotary } from "./NeuroRotary";
import { useState } from "preact/hooks";
import { foregroundColors, sizes } from "../../styles/styles";

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
  },
  argTypes: {
    color: {
      options: foregroundColors,
      control: { type: "select" },
    },
  },
  render: ({ color, textured }: any) => {
    const [isOn, setIsOn] = useState(false);
    const onClick = () => setIsOn((isOn) => !isOn);
    const [value, setValue] = useState(0)
    return (
      <div className="flex overflow-visible flex-wrap">
        <NeuroRotary value={value} onChange={setValue} textured={textured} />
      </div>
    );
  },
};
