import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import svgr from "vite-plugin-svgr";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    preact({
      prefreshEnabled: false,
    }),
    svgr({
      include: "**/*.svg",
      svgrOptions: {
        icon: true,
      },
    }),
    cssInjectedByJsPlugin({ styleId: "hassforge-neuro" }),
  ],
  build: {
    cssCodeSplit: false,

    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
      input: {
        app: "./src/index.tsx",
      },
    },
  },
});
