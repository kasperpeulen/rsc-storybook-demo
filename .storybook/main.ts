import type { StorybookConfig } from "@storybook/react-webpack5";
// @ts-expect-error no types
import ReactServerWebpackPlugin from "react-server-dom-webpack/plugin";
import { dirname, join } from "node:path";

const getAbsolutePath = <I extends string>(input: I): I =>
  dirname(require.resolve(join(input, "package.json"))) as any;

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-webpack5-compiler-swc"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  core: {
    builder: {
      name: getAbsolutePath("@storybook/builder-webpack5"),
      options: {},
    },
    renderer: undefined,
  },
  webpackFinal: async (config, options) => {
    config.resolve.alias[
      "@vercel/turbopack-ecmascript-runtime/browser/dev/hmr-client/hmr-client.ts"
    ] = "next/dist/client/dev/noop-turbopack-hmr";
    config.experiments!.layers = true;
    config.plugins!.unshift(new ReactServerWebpackPlugin({ isServer: false }));
    config.module?.rules?.push(
      {
        layer: "client",
        test: (request) => {
          return /react-client-entrypoint\.ts/.test(request);
        },
      },
      {
        issuerLayer: "client",
        resolve: {
          conditionNames: [
            "browser",
            ...(config.resolve?.conditionNames ?? []),
          ],
        },
      },
      {
        layer: "react-server",
        test: (request) => {
          return /storybook-config-entry\.js/.test(request);
        },
      },
      {
        issuerLayer: "react-server",
        loader: "./.storybook/rsc-transform-loader.js",
        resolve: {
          conditionNames: [
            "react-server",
            "browser",
            ...(config.resolve?.conditionNames ?? []),
          ],
        },
      },
    );
    return config;
  },
};
export default config;
