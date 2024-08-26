// * Colors

import clsx from "clsx";
import type { Falsy } from "react-native";
import { collapse } from "./helpers";
import type { StyleProps, Align, Size } from "../types";

/** Some colors 🌈 */
export const colors = [
    "#f06292",
    "#64b5f6",
    "#3949ab",
    "#4db6ac",
    "#81c784",
    "#dce775",
    "#ffa726",
    "#ff7043",
    "#8d6e63",
    "#607d8b",
    "#963bdb",
    "#12dbdb",
    "#db4d37",
    "#408557",
    "#c930a3",
    "#4286f4",
    "#ffc107",
    "#b2d8d8",
    "#c397e9",
];

export function randomColor(exclude?: string[]) {
    let filteredColors = colors;
    if (exclude) {
        const exclSet = new Set(exclude);
        filteredColors = colors.filter((item) => !exclSet.has(item));
        if (!filteredColors.length) return "";
    }
    const randomIndex = Math.floor(Math.random() * filteredColors.length);
    return filteredColors[randomIndex];
}

export function randomColors(length: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < length; i++) {
        colors.push(randomColor(colors));
    }
    return colors;
}

export function rgbToHex(r: number, g: number, b: number) {
    // Ensure the RGB values are within the valid range (0 to 255)
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    // Convert decimal to hexadecimal
    const hexR = r.toString(16).padStart(2, "0");
    const hexG = g.toString(16).padStart(2, "0");
    const hexB = b.toString(16).padStart(2, "0");

    // Concatenate the hex values
    const hexColor = "#" + hexR + hexG + hexB;
    return hexColor.toUpperCase(); // Convert to uppercase for consistency
}

export function rgbStrToHex(rgb: string) {
    const rgbArray = rgb.match(/\d+/g);

    if (!rgbArray || rgbArray.length !== 3) {
        return "#000000";
    }

    const r = +(rgbArray[0], 10);
    const g = +(rgbArray[1], 10);
    const b = +(rgbArray[2], 10);

    // Call the rgbToHex function and return the result

    return rgbToHex(r, g, b);
}

// --- CSS Styles

export function sizeClass(size: Size) {
    return collapse(size, {
        xxs: "RB§xxs",
        xs: "RB§xs",
        s: "RB§s",
        m: "RB§m",
        l: "RB§l",
        xl: "RB§xl",
        xxl: "RB§xxl",
    });
}

export function alignClass(align: Align) {
    return collapse(align || "center", {
        center: "items-center",
        start: "items-start",
        end: "items-end",
        none: "",
    });
}

export function alignSelfClass(align: Align) {
    return collapse(align, { start: "self-start", end: "self-end", center: "self-center", none: "" });
}

export function justifyClass(justify: Align) {
    return collapse(justify || "center", {
        end: "justify-end",
        center: "justify-center",
        start: "justify-start",
        none: "",
    });
}

// --- Theme

export function numberToColor(num: number): string {
    if (!num) return "gray";
    return "#" + num.toString(16).padStart(6, "0");
}

export function colorToNumber(color: string): number {
    if (!color || !color.startsWith("#")) return 0;
    const num = +(color.substring(1), 16);
    if (isNaN(num)) return -1;
    return num;
}
