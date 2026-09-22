import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    server: "src/server.ts",
    cli: "src/cli.ts",
  },
  format: ["cjs"],
  target: "node18",
  outDir: "dist",
  clean: true,
  bundle: true,
  sourcemap: true,
  dts: false,
  noExternal: ["js-yaml", "smol-toml"],
  banner: ({ entry }) => {
    if (entry === "cli") {
      return {
        js: "#!/usr/bin/env node",
      };
    }
    return {};
  },
});
