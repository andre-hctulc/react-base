import React from "react";
import { SizeMap, ThemeColor, XSizeMap } from "./types";
import { collapse } from "@client-util/helpers";

// * Helpers

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

for (let i = 0; i < 10000; i++) {
    if (!randomColor()) throw new Error("BUG");
}

export function rgbToHex(r: number, g: number, b: number) {
    // Ensure the RGB values are within the valid range (0 to 255)
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    // Convert decimal to hexadecimal
    const hexR = r.toString(16).padStart(2, "0");
    const hexG = g.toString(16).padStart(2, "0");
    var hexB = b.toString(16).padStart(2, "0");

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

    // Sichert, dass nur 1 child element vorhanden ist. Wirft entsprechend errors
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

/** Setzt die Referenz auf eine gegebenes `React.ForwardedRef<T>`-Objekt. */
export function setRef<T = any>(refObjOrFct: React.ForwardedRef<T> | undefined | null, ref: T) {
    if (typeof refObjOrFct === "function") refObjOrFct(ref);
    else if (typeof refObjOrFct === "object" && refObjOrFct) refObjOrFct.current = ref;
}

export function hasChildren(children: React.ReactNode) {
    if (!children) return false;
    return React.Children.count(children) !== 0;
}

// * Props

export type PropsOf<T> = T extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[T] : T extends React.ComponentType<infer P> ? P : never;

export interface StyledComponentProps {
    className?: string;
    style?: React.CSSProperties;
}
export type ParentComponentProps<T extends React.ReactNode = React.ReactNode, R extends boolean = false> = R extends true ? { children: T } : { children?: T };

export interface CommomComponentProps extends StyledComponentProps, ParentComponentProps {}

export interface EventProps<T = Element> {
    // Mouse
    onClick?: React.MouseEvent<T>;
    onDblClick?: React.MouseEvent<T>;
    onMouseOver?: React.MouseEvent<T>;
    onMouseLeave?: React.MouseEvent<T>;
    // Change
    onChange?: React.ChangeEvent<T>;
    // Focus
    onFocus?: React.FocusEvent<T>;
    onBlur?: React.FocusEvent<T>;
}

export namespace Next {
    export interface LayoutProps {
        children?: React.ReactNode;
        searchParams: Record<string, string>;
    }

    export interface PageProps {
        children?: React.ReactNode;
        searchParams: Record<string, string>;
        params: Record<string, string>;
    }
}

// * Theme

export function themeColor(color: ThemeColor | undefined | null): {
    text: string;
    bg: string;
    border: string;
    contrastText: string;
    bgLight: string;
    bgSuperLight: string;
} {
    switch (color) {
        case "chat":
            return {
                bg: "bg-chat",
                bgLight: "bg-chat-light",
                text: "text-chat",
                border: "border-chat",
                contrastText: "text-chat-contrast-text",
                bgSuperLight: "bg-chat-super-light",
            };
        case "error":
            return {
                bg: "bg-error",
                bgLight: "bg-error-light",
                text: "text-error",
                border: "border-error",
                contrastText: "text-error-contrast-text",
                bgSuperLight: "bg-error-super-light",
            };
        case "info":
            return {
                bg: "bg-info",
                bgLight: "bg-info-light",
                text: "text-info",
                border: "border-info",
                contrastText: "text-info-contrast-text",
                bgSuperLight: "bg-info-super-light",
            };
        case "fs":
            return {
                bg: "bg-fs",
                bgLight: "bg-fs-light",
                text: "text-fs",
                border: "border-fs",
                contrastText: "text-fs-contrast-text",
                bgSuperLight: "bg-fs-super-light",
            };
        case "task":
            return {
                bg: "bg-task",
                bgLight: "bg-task-light",
                text: "text-task",
                border: "border-task",
                contrastText: "text-task-contrast-text",
                bgSuperLight: "bg-task-super-light",
            };
        case "new":
            return {
                bg: "bg-new",
                bgLight: "bg-new-light",
                text: "text-new",
                border: "border-new",
                contrastText: "text-new-contrast-text",
                bgSuperLight: "bg-new-super-light",
            };
        case "secondary":
            return {
                bg: "bg-secondary",
                bgLight: "bg-secondary-light",
                text: "text-secondary",
                border: "border-secondary",
                contrastText: "text-secondary-contrast-text",
                bgSuperLight: "bg-secondary-super-light",
            };
        case "note":
            return {
                bg: "bg-note",
                bgLight: "bg-note-light",
                text: "text-note",
                border: "border-note",
                contrastText: "text-note-constrast-text",
                bgSuperLight: "bg-note-super-light",
            };
        case "success":
            return {
                bg: "bg-success",
                bgLight: "bg-success-light",
                text: "text-success",
                border: "border-success",
                contrastText: "text-success-contrast-text",
                bgSuperLight: "bg-success-super-light",
            };
        case "warning":
            return {
                bg: "bg-warning",
                bgLight: "bg-warning-light",
                text: "text-warning",
                border: "border-warning",
                contrastText: "text-warning-contrast-text",
                bgSuperLight: "bg-warning-super-light",
            };
        case "accent":
            return {
                bg: "bg-accent",
                bgLight: "bg-accent-light/10",
                text: "text-accent",
                border: "border-accent",
                contrastText: "text-accent-contrast-text",
                bgSuperLight: "bg-accent-super-light",
            };
        case "active":
            return {
                bg: "bg-active",
                bgLight: "bg-active-light",
                text: "text-active",
                border: "border-active",
                contrastText: "text-active-contrast-text",
                bgSuperLight: "bg-active-super-light",
            };
        case "primary":
        default:
            return {
                bg: "bg-primary",
                bgLight: "bg-primary-light",
                text: "text-primary",
                border: "border-primary",
                contrastText: "text-primary-contrast-text",
                bgSuperLight: "bg-primary-super-light",
            };
    }
}
