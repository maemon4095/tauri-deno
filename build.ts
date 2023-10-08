import * as esbuild from "https://deno.land/x/esbuild@v0.19.4/mod.js";
import { denoPlugins } from "https://deno.land/x/esbuild_deno_loader@0.8.2/mod.ts";
import { parse } from "https://deno.land/std@0.202.0/flags/mod.ts";
import { join } from "$std/path/mod.ts";

const args = parse(Deno.args, {
  boolean: ["dev"],
});
const is_dev = args.dev;

const mode = args._[0];
const configPath = join(Deno.cwd(), "deno.json");

const commonOptions: esbuild.BuildOptions = {
  plugins: [...denoPlugins({ configPath })],
  entryPoints: ["src/index.tsx"],
  outfile: "public/dist/index.js",
  bundle: true,
  format: "esm",
  platform: "browser",
};

let option: esbuild.BuildOptions;
if (is_dev) {
  option = commonOptions;
} else {
  option = {
    ...commonOptions, dropLabels: ["DEBUG"],
    minifySyntax: true,
  };
}

const context = await esbuild.context(option);

if (mode === "serve") {
  const { host, port } = await context.serve({ port: 1420, servedir: "public", });

  console.log(`Serving on ${host}:${port}`);
  const watcher = Deno.watchFs(["src"]);
  console.log("Watching...");
  for await (const e of watcher) {
    console.log(`File Update: (${e.kind}) ${e.paths}.`);
    await context.rebuild();
  }
}
if (mode === "build") {
  const result = await context.rebuild();
  console.log(result);
}

esbuild.stop();
