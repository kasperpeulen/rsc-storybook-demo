import type { Meta, StoryObj } from "@storybook/experimental-nextjs-rsc";

import { Like } from "./like";
import { onLike } from "./actions";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: Like,
  args: {
    onLike: onLike,
  },
} satisfies Meta;

export default meta;

export const Default: StoryObj = {};

export const WithArgs: StoryObj<{ label: string; onLike: () => void }> = {
  args: {
    label: "Label",
    onLike: onLike,
  },
  argTypes: {
    label: { control: "text" },
  },
};

export const WithRender: StoryObj<{ label: string; onLike: () => void }> = {
  render: () => <Like label={"Label"} onLike={onLike} />,
  argTypes: {
    label: { control: "text" },
  },
};
