import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import glsl from "vite-plugin-glsl";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
      // commonjsOptions: { transformMixedEsModules: true }, // Change
    },
    plugins: [react(), eslint(), glsl()],
    server: {
      // this ensures that the browser opens upon server start
      open: true,
      // this sets a default port to 3000
      port: 3000,
    },
  };
});
