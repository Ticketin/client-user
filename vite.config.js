import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// build
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  // in case you want to interact with rollup you can use

  optimizeDeps: {
    exclude: ["nft.storage"],
  },
  build: {
    rollupOptions: {
      external: [
        "nft.storage", // ignore nft.storage
      ],
    },
  },
});
