import { resolve } from "node:path";
import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import tailwindcss from "@tailwindcss/vite";
import { playwright } from "@vitest/browser-playwright";

const dirname = import.meta.dirname;

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineConfig({
    plugins: [tailwindcss()],
    test: {
        projects: [
            {
                extends: true,
                plugins: [
                    tailwindcss(),
                    // The plugin will run tests for the stories defined in your Storybook config
                    // See options at: https://storybook.js.org/docs/writing-tests/test-addon#storybooktest
                    storybookTest({
                        configDir: resolve(dirname, ".storybook"),
                    }),
                ],
                test: {
                    name: "storybook",
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: playwright(),
                        instances: [{ browser: "chromium" }],
                    },
                    setupFiles: [resolve(dirname, ".storybook/vitest.setup.ts")],
                },
            },
        ],
    },
});
