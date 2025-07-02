import type { Meta, StoryObj } from "@storybook/experimental-nextjs-rsc";

import { userEvent, within } from "storybook/test";
import { Component } from "./Component";

export default {
  component: Component,
  parameters: {
    test: {
      dangerouslyIgnoreUnhandledErrors: true,
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
  tags: ["!test"],
} as Meta;

export const SingletonStateGetsInvalidatedAfterRedirecting: StoryObj = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
  },
};
