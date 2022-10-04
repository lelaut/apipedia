import { build } from "esbuild";
import { generate } from "@graphql-codegen/cli";
import { nodeExternalsPlugin } from "esbuild-node-externals";
import glob from "glob";
import fs from "fs";

const main = async () => {
  try {
    // Generate type-defs for apollo server
    glob("./graphql/**/*.graphql", {}, (err, files) => {
      console.log("call");
      if (err) process.exit(1);

      const typeDefFilename = "src/__generated__/type-defs.ts";
      fs.writeFileSync(
        typeDefFilename,
        `
        import { gql } from "apollo-server";
        import { mergeTypeDefs } from "@graphql-tools/merge";

        const types = {
        `
      );
      files.forEach((filename) => {
        fs.appendFileSync(
          typeDefFilename,
          `'${filename}': gql\`${fs.readFileSync(filename).toString()}\`,\n`
        );
      });
      fs.appendFileSync(
        typeDefFilename,
        `};\nexport default mergeTypeDefs(Object.values(types));`
      );
    });

    // TODO: treat error
    // Generate resolvers and types
    await generate({
      // schema: "http://127.0.0.1:3000/graphql",
      // documents: "./graphql/**/*.graphql",
      schema: "./graphql/**/*.graphql",
      generates: {
        "./src/__generated__/types.d.ts": {
          plugins: ["typescript", "typescript-resolvers"],
        },
      },
    });

    // Build project
    await build({
      entryPoints: ["./src/index.ts"],
      outfile: "lib/index.cjs",
      bundle: true,
      minify: true,
      platform: "node",
      sourcemap: true,
      target: "node14",
      plugins: [nodeExternalsPlugin()],
    });
  } catch {
    process.exit(1);
  }
};

main();
