// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/preact";
import { Neuro7Segment } from "./Neuro7Segment";
import { useState } from "preact/hooks";

const meta: Meta<typeof Neuro7Segment> = {
  component: Neuro7Segment,
};

export default meta;
type Story = StoryObj<typeof Neuro7Segment>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

export const Primary: Story = {
  args: {
    string: "This is a test",
    width: 4
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

  render: ({width, string}: any) => {
    return (
      <div className="flex overflow-visible flex-col flex-wrap flex-1 justify-center bg-gray-800">
        <div>
          <Neuro7Segment width={width} value={string} segmentOffClasses="bg-gray-950" />
        </div>
        <div>
          <Neuro7Segment width={width} value={"123456789"} segmentOffClasses="bg-gray-950" />
        </div>
        <div>
          <Neuro7Segment width={width}
            value={"abcdefghijklmnopqrstuvwyxz"}
            segmentOffClasses="bg-gray-950"
          />
        </div>
        <div>
          <Neuro7Segment width={width}
            value={"abcdefghijklmnopqrstuvwyxz".toUpperCase()}
            segmentOffClasses="bg-gray-950"
          />
        </div>
        <div>
          <Neuro7Segment width={width}
            value={"-='\"_".toUpperCase()}
            segmentOffClasses="bg-gray-950"
          />
        </div>
      </div>
    );
  },
};
