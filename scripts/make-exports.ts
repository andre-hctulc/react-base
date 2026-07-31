import fs from "fs";
import path from "path";

const componentsJson = JSON.parse(fs.readFileSync("components.json", "utf-8"));

const srcDir = path.resolve("src");
const cwd = process.cwd();

async function createExports(): Promise<Record<string, string>> {
    // #### cn components ####

    const cnComponentsAlias = componentsJson.aliases.ui.replace(/^@\//, "");
    const cnComponentsDir = path.join(cwd, "src", cnComponentsAlias);
    const cnComponents = fs.readdirSync(cnComponentsDir, { withFileTypes: true });

    const exports: Record<string, string> = {
        ".": "./dist/index.js",
        "./hooks": "./dist/hooks/index.js",
        "./types": "./dist/types/index.js",
        "./util": "./dist/util/index.js",
    };

    // cn components
    for (const entry of cnComponents) {
        if (entry.isDirectory()) {
            continue;
        }

        const entryWithoutExtension = entry.name.replace(/\.tsx?$/, "");

        const exportPath = `./dist/${path.relative(srcDir, cnComponentsDir)}/${entryWithoutExtension}.js`;

        const exportKey = `./cn/${entryWithoutExtension}`;

        exports[exportKey] = exportPath;
    }

    // #### custom components ####

    const customComponentsDir = path.join(cwd, "src", "components");
    const customComponents = fs.readdirSync(customComponentsDir, { withFileTypes: true });

    // custom components
    for (const entry of customComponents) {
        if (!entry.isDirectory()) {
            continue;
        }

        const indexPath = path.join(customComponentsDir, entry.name, "index.ts");
        if (!fs.existsSync(indexPath) || entry.name === "cn") {
            console.warn(`Warning: No index.tsx found for component ${entry.name}. Skipping export.`);
            continue;
        }

        const entryWithoutExtension = entry.name.replace(/\.tsx?$/, "");

        const exportPath = `./dist/${path.relative(srcDir, customComponentsDir)}/${entryWithoutExtension}/index.js`;

        const exportKey = `./components/${entryWithoutExtension}`;

        exports[exportKey] = exportPath;
    }

    return exports;
}

async function writeExportsToPackageJson(exports: Record<string, string>) {
    const packageJsonPath = path.join(cwd, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

    packageJson.exports = exports;

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4), "utf-8");
}

async function main() {
    const exports = await createExports();
    await writeExportsToPackageJson(exports);
    console.log("Exports written to package.json");
    console.log(JSON.stringify(exports, null, 4));
}

await main();
