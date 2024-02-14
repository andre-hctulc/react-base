import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        // for resolving sym links in public dir correctly
        preserveSymlinks: true,
        alias: { "@react-base": path.resolve(__dirname, "..") },
    },
    build: {
        outDir: "../demo-build",
    },
    esbuild: {
        supported: {
            "top-level-await": true,
        },
    },
    // optimizeDeps: { include: ["@react-base"] },
});
