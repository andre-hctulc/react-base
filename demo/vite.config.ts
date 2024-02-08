import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, ".."),
        },
        // for resolving sym links in public dir correctly
        preserveSymlinks: true,
    },
    build: { outDir: "../demo-build" },
});
