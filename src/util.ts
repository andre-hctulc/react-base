import React from "react";
import type { Align, SizeMap, ThemeColor, ThemeColorDef, XSizeMap } from "./types";

// * Helpers

/** 🌊 🎯 */
export function collapse<V extends string, R = any>(value: V, map: { [K in V]: R }, fallback?: R): R {
    if (!(value in map) && fallback !== undefined) return fallback as R;
    return map[value];
}

/** 🌊 🎯 🥈 */
export function collapseWeak<V extends string, R = any>(
    value: V | undefined,
    map: { [K in V]?: R }
): R | undefined {
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

export function getSize<S extends SizeMap | XSizeMap>(size: keyof S | number, sizeMap: S): number {
    const result = typeof size === "string" ? (sizeMap as any)[size] : size;
    return result;
}

// * Colors

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

// * React

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
                    (mapperResult as any).children === null
                        ? undefined
                        : (mapperResult as any).children || child.props.children
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
        if (
            (child as React.ReactElement<any>).type === React.Fragment ||
            flattenElements?.includes((child as React.ReactElement<any>).type)
        )
            return flatChildren.concat(flattenChildren((child as React.ReactElement<any>).props.children));
        flatChildren.push(child);
        return flatChildren;
    }, []);
}

/** Sets the value of one or more references */
export function setRef<T = any>(
    value: T,
    ...refs: (React.ForwardedRef<T> | React.LegacyRef<T> | undefined | null)[]
) {
    for (const ref of refs) {
        if (typeof ref === "function") ref(value);
        else if (ref && typeof ref === "object") (ref.current as any) = value;
    }
}

export function hasChildren(children: React.ReactNode) {
    if (!children) return false;
    return React.Children.count(children) !== 0;
}

export function findChildren<S extends Record<string, (child: React.ReactNode) => boolean>>(
    children: React.ReactNode,
    search: S
): { [K in keyof S]: React.ReactNode[] } {
    const flattened = flattenChildren(children);
    const result: any = {};
    for (const k in search) result[k] = [];

    for (const child of flattened) {
        for (const k in search) {
            const find = search[k];
            if (find(child)) result[k].push(child);
        }
    }
    return result;
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

// * Timing

export type CubicBezierControllPoints = [number, number, number, number];

/**
 * [Bézierkurve](https://de.wikipedia.org/wiki/Bézierkurve), [Generator](https://cubic-bezier.com/#.17,.67,.83,.67)
 *
 * Berechnet den Wert an `t`.
 * @param t _0 <= t <= 1_
 * @param controllPoints Kontrollpunkte der Bézierkurve. Defaults to _[0, 0.1, 0.9, 1]_. `cubicBezier` besitzt auch Standard-Werte als static members. Defaults to `cubicBezier.easeIn`
 * @returns _0 <= t <= 1_. Es gilt `cubicBezier(0)=0` und `cubicBezier(1)=1`
 */

export function cubicBezier(t: number, controllPoints?: CubicBezierControllPoints) {
    const [p0, p1, p2, p3] = controllPoints || cubicBezier.easeIn;

    /** Interpolation = estimate values between two points for a given function */
    function bezierInterpolation(t: number, p0: number, p1: number, p2: number, p3: number) {
        return (
            Math.pow(1 - t, 3) * p0 +
            3 * Math.pow(1 - t, 2) * t * p1 +
            3 * (1 - t) * Math.pow(t, 2) * p2 +
            Math.pow(t, 3) * p3
        );
    }

    // Calculate the value on the curve for a given time fraction 't'
    return bezierInterpolation(t, p0, p1, p2, p3);
}
cubicBezier.easeIn = [0.42, 0, 0.58, 1] as CubicBezierControllPoints;
cubicBezier.easeOut = [0, 0, 0.42, 1] as CubicBezierControllPoints;
cubicBezier.ease = [0.25, 0, 0.75, 1] as CubicBezierControllPoints;
