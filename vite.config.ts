import { defineConfig } from "vite";

export default defineConfig({
  base : "/threeJSSeason/",
    build: {
      minify: 'esbuild',
      target: "esnext"
    }
  })