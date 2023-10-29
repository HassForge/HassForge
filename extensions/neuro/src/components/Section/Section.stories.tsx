// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/preact";
import { Section } from "./Section";
import { useState } from "preact/hooks";
import { colors } from "../../styles/color-map";
import { NeuroRotary } from "../NeuroRotary";

const meta: Meta<typeof Section> = {
  component: Section,
};

export default meta;
type Story = StoryObj<typeof Section>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

export const Primary: Story = {
  args: {
    title: "Lounge",
    orientation: undefined,
    textPosition: undefined,
  },
  argTypes: {
    orientation: {
      optional: true,
      options: [undefined, "upright", "bottom-to-top"],
      control: { type: "radio" },
    },
    textPosition: {
      optional: true,
      options: ["left", "right"],
      control: { type: "radio" },
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

  render: ({ title, orientation, textPosition }: any) => {
    return (
      <div className="flex overflow-visible flex-wrap flex-1 justify-center bg-gray-800">
        <Section
          title={title}
          orientation={orientation}
          textPosition={textPosition}
        >
          <NeuroRotary value={24} onChange={console.log} color="red" />
        </Section>
      </div>
    );
  },
};
