import type { StorybookConfig } from "@storybook/experimental-nextjs-rsc";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  framework: "@storybook/experimental-nextjs-rsc",
};

export default config;
