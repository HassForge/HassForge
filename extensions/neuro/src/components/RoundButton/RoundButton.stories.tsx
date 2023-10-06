// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/preact";
import FlashIcon from "@mdi/svg/svg/flash.svg";
import FireIcon from "@mdi/svg/svg/fire.svg";
import LightIcon from "@mdi/svg/svg/lightbulb.svg";

import { RoundButton } from "./RoundButton";
import { useState } from "preact/hooks";

const meta: Meta<typeof RoundButton> = {
  component: RoundButton,
};

export default meta;
type Story = StoryObj<typeof RoundButton>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

export const Primary: Story = {
  render: () => {
    const [isOn, setIsOn] = useState(false);
    const onClick = () => setIsOn((isOn) => !isOn);
    return (
      <div className="flex">
        <RoundButton
          icon={(classes) => (
            <FlashIcon
              class={classes}
              fill="currentColor"
              width="24px"
              height="24px"
            />
          )}
          isOn={isOn}
          onClick={onClick}
          background="gray"
          color="red"
          pulse
        />
        <RoundButton
          isOn={isOn}
          onClick={onClick}
          icon={(classes) => (
            <FireIcon
              class={classes}
              fill="currentColor"
              width="24px"
              height="24px"
            />
          )}
          background="gray"
          color="yellow"
          pulse
        />
        <RoundButton
          isOn={isOn}
          onClick={onClick}
          icon={(classes) => (
            <LightIcon
              class={classes}
              fill="currentColor"
              width="24px"
              height="24px"
            />
          )}
          background="gray"
          color="none"
        />
      </div>
    );
  },
};
