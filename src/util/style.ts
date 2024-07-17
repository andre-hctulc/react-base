// * Colors

import clsx from "clsx";
import { Falsy } from "react-native";
import { collapse } from "./helpers";
import { StyleProps, Align, XSize, ThemeColor, ThemeColorDef, SizeMap, XSizeMap } from "../types";

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

// * CSS Styles

function mergeStyles(...styles: StyleProps["style"][]): React.CSSProperties {
    return styles.reduce<React.CSSProperties>(
        (style, currentStyle) => ({
            ...style,
            ...(Array.isArray(currentStyle) ? mergeStyles(...currentStyle) : currentStyle || {}),
        }),
        {}
    );
}

export function styleProps(...style: (StyleProps | Falsy)[]): {
    style: React.CSSProperties;
    className: string;
} {
    return {
        style: mergeStyles(...style.map((s) => (s ? s.style : {}))),
        className: clsx(style.map((s) => s && s.className)),
    };
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

export function shadowClass(shadow: XSize | "none") {
    return collapse(shadow, {
        none: "",
        xsmall: "shadow-xs",
        small: "shadow-sm",
        medium: "shadow-md",
        large: "shadow-lg",
        xlarge: "shadow-xl",
    });
}

// * Theme

/**
 * @returns Utility classes for theme colors
 * */
export function themeColor<C extends ThemeColor<true>>(
    color: C
): ThemeColorDef &
    Record<`${"hover_" | "active_" | "focus_" | ""}${C extends ThemeColorDef ? keyof C : C}`, string> {
    let def: ThemeColorDef;

    if (color && typeof color === "object") def = color;
    else {
        def = {
            bg: `bg-${color}`,
            bgSuperLight: `bg-${color}-super-light`,
            bgLight: `bg-${color}-light`,
            bgDark: `bg-${color}-dark`,
            text: `text-${color}`,
            textSuperLight: `text-${color}-super-light`,
            textLight: `text-${color}-light`,
            textDark: `text-${color}-dark`,
            border: `border-${color}`,
            borderLight: `border-${color}-light`,
            borderSuperLight: `border-${color}-super-light`,
            borderDark: `border-${color}-dark`,
            contrastText: `text-${color}-contrast-text`,
        };
    }

    for (const key in def) {
        (def as any)[`hover_${key}`] = `hover:${(def as any)[key]}`;
        (def as any)[`active_${key}`] = `active:${(def as any)[key]}`;
        (def as any)[`focus_${key}`] = `focus:${(def as any)[key]}`;
    }

    return def as any;
}

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

export function getSize<S extends SizeMap | XSizeMap>(size: keyof S | number, sizeMap: S): number {
    const result = typeof size === "string" ? (sizeMap as any)[size] : size;
    return result;
}
