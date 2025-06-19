import { transformSource, getSource } from "react-server-dom-webpack/node-loader";

export default async function rscTransformLoader(code, map) {
  const callback = this.async();
  try {
    let url = "file://" + this.resourcePath;

    await getSource(url, { format: "module" }, async (url, context) => {
      return { source: code};
    })

    const { source } = await transformSource(
       code,
      { format: "module", url: url },
      async (source) => ({
        source,
      }),
    );
    callback(null, source, map);
  } catch (err) {
    callback(err);
  }
}
