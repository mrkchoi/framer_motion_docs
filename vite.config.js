import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default defineConfig(() => {
  return {
    assetsInclude: ["**/*.gltf", "**/*.glb"],
    build: {
      outDir: "build",
      // commonjsOptions: { transformMixedEsModules: true }, // Change
    },
    plugins: [react(), eslint()],
    server: {
      // this ensures that the browser opens upon server start
      open: true,
      // this sets a default port to 3000
      port: 3000,
    },
  };
});
