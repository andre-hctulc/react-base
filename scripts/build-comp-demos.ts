/*
This script creates the component demo modules for the Demo
*/

import path from "path";
import fs from "fs";
import { sync as glob } from "glob";

function exit(code: number, reason: string) {
    console.error(reason);
    return process.exit(code);
}

// * in

const args = process.argv.slice(2);

const inPath = path.resolve("./src");
if (!fs.existsSync(inPath) || !fs.statSync(inPath).isDirectory()) exit(1, `No such directory: '${inPath}'`);

// exclude
const _excludeDirs = ["./components/icons/collection"];
const ecxcludeDirs = _excludeDirs.map(dir => path.join(inPath, dir));
const _excludeFiles = [".DS_Store"];
const excludeFiles = new Set(_excludeFiles);

function checkDirExclude(path: string) {
    return ecxcludeDirs.some(excluded => path.startsWith(excluded));
}

// * out

/** Demo Directory */
const outDir = path.resolve("./demo/src/_modules");
if (!fs.existsSync(outDir)) await fs.promises.mkdir(outDir, { recursive: true });
else if (!fs.statSync(outDir).isDirectory()) exit(2, `Output path is not a directory: '${outDir}'`);

const publicDir = path.resolve("./demo/public");
if (!fs.existsSync(publicDir)) await fs.promises.mkdir(publicDir, { recursive: true });
else if (!fs.statSync(publicDir).isDirectory()) exit(3, `Public dir is not a directory: '${publicDir}'`);

// * write

async function buildModuleDefs(dir: string, baseDir: string) {
    const files = await fs.promises.readdir(dir);

    for (const entry of files) {
        const entryPath = path.join(dir, entry);
        if (entry.includes("-") || checkDirExclude(entryPath) || excludeFiles.has(entry)) continue;
        const stat = fs.statSync(entryPath);
        const relPath = path.join(baseDir, entry);
        if (stat.isDirectory()) await buildModuleDefs(entryPath, relPath);
        else await buildModuleDef(entryPath, relPath);
    }
}

async function buildModuleDef(filePath: string, relPath: string) {
    const fileExtension = path.extname(filePath);
    const fileName = path.basename(filePath, fileExtension);
    const outPath: string = path.join(outDir, path.dirname(relPath), fileName + ".def" + fileExtension);
    const compName = path.basename(filePath);
    const content = `import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./${fileName}.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "${compName}", path: "${relPath}", demos: demos || [] };

export default mod;
`;

    const baseDir = path.dirname(outPath);

    if (!fs.existsSync(baseDir)) await fs.promises.mkdir(baseDir, { recursive: true });

    await fs.promises.writeFile(outPath, content);
}

/** Creates Assets for the demo including the source code and demos. */
async function buildAssets() {
    // sym link code
    const codeAssetPath = path.join(publicDir, "code");
    if (fs.existsSync(codeAssetPath)) await fs.promises.unlink(codeAssetPath);
    await fs.promises.symlink(inPath, codeAssetPath, "dir");

    // sym link demos

    const demoFiles = glob(path.join(outDir, "**/*.demo.tsx"));

    await Promise.all(
        demoFiles.map(async file => {
            const relPath = path.relative(outDir, file);
            const outPath = path.join(publicDir, "demos", relPath);
            const baseDir = path.dirname(outPath);
            if (!fs.existsSync(baseDir)) await fs.promises.mkdir(baseDir, { recursive: true });
            if (fs.existsSync(outPath)) await fs.promises.unlink(outPath);
            await fs.promises.symlink(file, outPath);
        })
    );
}

// Delete old definitions
async function clear() {
    const clear = glob(path.join(outDir, "**/*.def.{ts,tsx}"));
    await Promise.all(clear.map(file => fs.promises.unlink(file)));
}

// * main

async function main() {
    await clear();
    await buildModuleDefs(inPath, ".");
    await buildAssets();
}

main();
