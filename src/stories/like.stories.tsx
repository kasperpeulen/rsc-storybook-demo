import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { Like } from "./like";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: Like,
} satisfies Meta;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: StoryObj = {};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithRender: StoryObj<{ label: string }> = {
  args: {
    label: "Label",
  },
  argTypes: {
    label: { control: "text" },
  },
};
