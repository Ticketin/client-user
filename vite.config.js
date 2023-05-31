import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
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
