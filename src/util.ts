import React from "react";
import type { SizeMap, ThemeColor, ThemeColorDef, XSizeMap } from "./types";

// * Helpers

/** 🌊 🎯 */
export function collapse<V extends string, R = any>(value: V, map: { [K in V]: R }, fallback?: R): R {
    if (!(value in map) && fallback !== undefined) return fallback as R;
    return map[value];
}

/** 🌊 🎯 🥈 */
export function collapseWeak<V extends string, R = any>(value: V | undefined, map: { [K in V]?: R }): R | undefined {
    if (value === undefined) return undefined;
    return map[value];
}

export function eventProps(props: Record<string, any>) {
    const result: Record<string, any> = {};
    for (const propName in props) if (/on[A-Z].*/.test(propName)) result[propName] = props[propName];
    return result;
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

export function getSize<S extends SizeMap | XSizeMap>(sizeMap: S, size: keyof S | number): number {
    const result = typeof size === "string" ? (sizeMap as any)[size] : size;
    return result;
}

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
        filteredColors = colors.filter(item => !exclSet.has(item));
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

export function alignClass(align: "center" | "start" | "end") {
    return collapse(align || "center", { center: "items-center", start: "items-start", end: "items-end" });
}

export function justifyClass(align: "center" | "start" | "end") {
    return collapse(align || "center", { end: "justify-end", center: "justify-center", start: "justify-start" });
}

/**
 * @param children
 * @param mapper New children are replaced and props are added. Use `overwriteProps` to replace previous props.
 * @param overwriteProps
 * @returns
 */
export function mapChildren<P extends Record<string, any> = Record<string, any>>(
    children: React.ReactNode,
    mapper: (
        child: React.ReactElement<P, string | React.JSXElementConstructor<P>>,
        index: number
    ) => { props?: P; children?: React.ReactNode | null } | void | null | React.ReactNode,
    only?: boolean
) {
    let c = children;

    // Onyl one child
    if (only) c = React.Children.only(children);

    const mapped = React.Children.map(c, (child, index) => {
        if (React.isValidElement(child)) {
            const mapperResult = mapper(child as any, index);

            if (mapperResult === null) return;
            else if (mapperResult === undefined) {
                return React.cloneElement(child, child.props, child.props.children);
            } else if (React.isValidElement(mapperResult)) {
                return mapperResult;
            } else {
                return React.cloneElement(
                    child,
                    (mapperResult as any).props || {},
                    (mapperResult as any).children === null ? undefined : (mapperResult as any).children || child.props.children
                );
            }
        }
    });

    if (only) return mapped && mapped[0];
    else return mapped;
}

type ReactChildrenArray = ReturnType<typeof React.Children.toArray>;

export function flattenChildren(children: React.ReactNode, flattenElements?: any[]): ReactChildrenArray {
    const arr = React.Children.toArray(children);

    return arr.reduce((flatChildren: ReactChildrenArray, child) => {
        if ((child as React.ReactElement<any>).type === React.Fragment || flattenElements?.includes((child as React.ReactElement<any>).type))
            return flatChildren.concat(flattenChildren((child as React.ReactElement<any>).props.children));
        flatChildren.push(child);
        return flatChildren;
    }, []);
}

/** Sets the value of one or more references */
export function setRef<T = any>(refs: (React.ForwardedRef<T> | undefined | null)[] | React.ForwardedRef<T> | undefined | null, value: T) {
    if (!Array.isArray(refs)) refs = [refs];
    for (const ref of refs) {
        if (typeof ref === "function") ref(value);
        else if (ref && typeof ref === "object") ref.current = value;
    }
}

export function hasChildren(children: React.ReactNode) {
    if (!children) return false;
    return React.Children.count(children) !== 0;
}

// * Theme

export function themeColor(color: ThemeColor | ThemeColorDef | undefined | null): ThemeColorDef {
    if (color && typeof color === "object") return color;

    return {
        bg: `bg-${color}`,
        bgLight: `bg-${color}-light`,
        text: `text-${color}`,
        border: `border-${color}`,
        contrastText: `text-${color}-contrast-text`,
        bgSuperLight: `bg-${color}-super-light`,
    };
}
