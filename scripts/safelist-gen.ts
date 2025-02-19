import fs from "fs";

const themeColors = ["primary", "secondary", "error", "success", "warning", "info", "accent", "neutral"]
    .map((c) => [c, `${c}-contrast`])
    .flat();
const variants = ["hover:", "focus:", "active:", "disabled:"];
const styles = ["bg", "border", "text"];
const alpha = [0, 10, 20, 30, 40, 50, 75, 90, 100];

const out = "safelist.txt";

function createSafelist() {
    const stream = fs.createWriteStream(out);

    for (const style of styles) {
        for (const color of themeColors) {
            stream.write(`${style}-${color}\n`);
            for (const a of alpha) {
                stream.write(`${style}-${color}/${a}\n`);
            }
        }
    }

    for (const variant of variants) {
        for (const style of styles) {
            for (const color of themeColors) {
                stream.write(`${variant}${style}-${color}\n`);
                for (const a of alpha) {
                    stream.write(`${variant}${style}-${color}/${a}\n`);
                }
            }
        }
    }

    stream.end();

    console.log(`📋 Safelist generated at ${out}. Size: ${fs.statSync(out).size} bytes`);
}

createSafelist();
