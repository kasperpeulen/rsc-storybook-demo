import type { Preview, ReactRenderer } from "@storybook/react-webpack5";
import type {
  DecoratorFunction,
  LegacyStoryFn,
  RenderContext,
} from "storybook/internal/types";

// @ts-expect-error no types
import { renderToReadableStream } from "react-server-dom-webpack/server";
import { defaultDecorateStory } from "storybook/preview-api";

import {
  use,
  createRoot,
  createFromReadableStream,
} from "./react-client-entrypoint";
import type { JSX, Usable } from "react";
import React from "react";
import type { Root } from "react-dom/client";

function Use({ value }: { value: Usable<JSX.Element> }) {
  return use(value);
}

const nodes = new Map<Element, Root>();

const getReactRoot = (el: Element): Root => {
  if (!nodes.get(el)) nodes.set(el, createRoot(el));
  return nodes.get(el)!;
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  render: (args, context) => {
    const { id, component: Component } = context;
    if (!Component) {
      throw new Error(
        `Unable to render story ${id} as the component annotation is missing from the default export`,
      );
    }
    return <Component {...args} />;
  },
  applyDecorators: (
    storyFn: LegacyStoryFn<ReactRenderer>,
    decorators: DecoratorFunction<ReactRenderer>[],
  ): LegacyStoryFn<ReactRenderer> => {
    return defaultDecorateStory(
      (context) => React.createElement(storyFn, context),
      decorators,
    );
  },

  renderToCanvas: async function (
    {
      storyContext,
      unboundStoryFn,
      showMain,
      showException,
      forceRemount,
    }: RenderContext<ReactRenderer>,
    canvasElement: ReactRenderer["canvasElement"],
  ) {
    const manifest = await fetch("/react-client-manifest.json").then((it) =>
      it.json(),
    );

    const root = getReactRoot(canvasElement);
    const Story = unboundStoryFn;

    const stream = renderToReadableStream(
      <Story {...storyContext} />,
      manifest,
    );
    root.render(
      <Use
        value={createFromReadableStream(stream, {
          callServer: async (id: string, args: unknown[]) => {
            console.log(`action called with`, { id, args });

            // for example: file:///Users/kasperpeulen/code/rsc-webpack-browser5/src/components/actions.ts#saveToDb
            const [filepath, name] = id!.split("#");

            // TODO probably too hacky, but not sure how else
            const module = Object.keys(__webpack_modules__).find((id) =>
              filepath?.endsWith(id.replace("(react-server)/./", "")),
            );
            if (module) {
              const action = __webpack_require__(module)[name!];
              // setTimeout(renderStory, 0);
              return action?.(...args);
            }
          },
        })}
      />,
    );

    showMain();
  },
};

declare global {
  var __webpack_modules__: Record<string, unknown>;
  var __webpack_require__: (
    id: string,
  ) => Record<string, (...args: any[]) => any>;
}

export default preview;
