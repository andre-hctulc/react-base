import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const registryPath = resolve(packageRoot, "css/registry.json");
const outputPath = resolve(packageRoot, ".storybook/css/registry-theme.css");
const registry = JSON.parse(await readFile(registryPath, "utf8"));
const theme = registry.items.find((item) => item.type === "registry:theme");

if (!theme?.cssVars?.light || !theme?.cssVars?.dark) {
    throw new Error("Expected a registry:theme item with light and dark cssVars.");
}

function declarations(values) {
    return Object.entries(values)
        .map(([name, value]) => `    --${name}: ${value};`)
        .join("\n");
}

const tokenNames = Object.keys(theme.cssVars.light);
const colorTokens = tokenNames.filter((name) => name !== "radius");
const colorMappings = colorTokens.map((name) => `    --color-${name}: var(--${name});`).join("\n");

const css = `/* Generated from css/registry.json for Storybook. Run \`pnpm theme:css\` after changing registry tokens. */
:root {
${declarations(theme.cssVars.light)}
}

.dark {
${declarations(theme.cssVars.dark)}
}

@theme inline {
${colorMappings}
    --radius: var(--radius);
    --radius-sm: calc(var(--radius) * 0.6);
    --radius-md: calc(var(--radius) * 0.8);
    --radius-lg: var(--radius);
    --radius-xl: calc(var(--radius) * 1.4);
}
`;

await writeFile(outputPath, css);
