import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import { mergeConfig } from "vite";

const root = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
    stories: ["../stories/**/*.stories.@(ts|tsx)"],
    addons: ["@storybook/addon-vitest"],
    framework: "@storybook/react-vite",
    viteFinal: async (config) =>
        mergeConfig(config, {
            plugins: [tailwindcss()],
            resolve: {
                alias: {
                    "@": resolve(root, "../src"),
                },
            },
        }),
};

export default config;
