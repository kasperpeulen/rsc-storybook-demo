import type { Meta, StoryObj } from "@storybook/experimental-nextjs-rsc";
import React, { Suspense } from "react";

import { Users, Text } from "./users";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: Users,
} satisfies Meta;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: StoryObj = {};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const WithRender: StoryObj<{ label: string }> = {
  render: ({ label }) => {
    return (
      <div>
        <Text>All users {label}</Text>
        <Suspense
          fallback={"Rendering async server components on the client..."}
        >
          <Users />
        </Suspense>
      </div>
    );
  },
  args: {
    label: "Label",
  },
  argTypes: {
    label: { control: "text" },
  },
};

export const WithDecorators: StoryObj = {
  decorators: [
    (Story) => {
      return (
        <div>
          With Decorators
          <Story />
        </div>
      );
    },
  ],
};
