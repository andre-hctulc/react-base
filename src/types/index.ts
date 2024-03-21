import type clsx from "clsx";
import type React from "react";

export type Falsy = null | undefined | "" | 0 | false;

// NOTE: declaration merging not possible with union  types
/** Allows declaration merging  */
export interface ThemeColorMap {
    primary: any;
    secondary: any;
    error: any;
    warning: any;
    info: any;
    success: any;
    accent: any;
}

export type Size = "small" | "medium" | "large";
export type XSize = "xsmall" | "small" | "medium" | "large" | "xlarge";
export type DynamicSize = "small" | "medium" | "large" | number;
export type XDynamicSize = "xsmall" | "small" | "medium" | "large" | "xlarge" | number;

export type SizeMap<T = number> = { [K in DynamicSize]: T };
export type XSizeMap<T = number> = { [K in XDynamicSize]: T };

export type Align = "start" | "end" | "center" | "none";

/** Use `<D>`to allow js definitions */
export type ThemeColor<D extends boolean = false> = D extends true
    ? keyof ThemeColorMap | ThemeColorDef
    : keyof ThemeColorMap;
export type ThemeColorDef = Record<
    `${"text" | "bg" | "border"}${"Light" | "SuperLight" | "Dark" | ""}` | "contrastText",
    string
>;

// * Props

export type PropsOf<T> = T extends HTMLElement
    ? React.HTMLProps<T>
    : T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : T extends React.ComponentType<infer P>
    ? P
    : never;
export type PartialPropsOf<T> = Partial<PropsOf<T>>;

type Style = React.CSSProperties | Falsy | Style[];

export interface StyleProps {
    style?: Style;
    className?: clsx.ClassValue;
}

export interface DefaultStyleProps {
    style?: React.CSSProperties;
    className?: string;
}

export type ParentProps<
    T extends React.ReactNode = React.ReactNode,
    R extends boolean = false
> = R extends true ? { children: T } : { children?: T };

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

export type NextLayoutProps<P extends string = never> = {
    children?: React.ReactNode;
    searchParams: Record<string, string>;
} & Record<P, React.ReactNode>;

export interface NextPageProps {
    children?: React.ReactNode;
    searchParams: Record<string, string>;
}

export type SlotProps<C extends Record<string, any>> = {
    slotProps?: { [K in keyof C]?: Partial<PropsOf<C[K]>> };
    slots?: { [K in keyof C]?: React.ReactNode };
};

export type ImageComponentProps = {
    height?: number;
    width?: number;
    style?: React.CSSProperties;
    alt?: string;
    src?: string;
};

export type LinkProps = {
    onClick?: React.MouseEventHandler;
    target?: React.HTMLAttributeAnchorTarget;
    download?: string;
    href: string | undefined;
    children?: React.ReactNode;
};

// Events

export interface MouseEventProps<T extends Element = Element> {
    onClick?: (event: React.MouseEvent<T>) => void;
    onDoubleClick?: (event: React.MouseEvent<T>) => void;
    onMouseDown?: (event: React.MouseEvent<T>) => void;
    onMouseUp?: (event: React.MouseEvent<T>) => void;
    onMouseEnter?: (event: React.MouseEvent<T>) => void;
    onMouseLeave?: (event: React.MouseEvent<T>) => void;
    onMouseMove?: (event: React.MouseEvent<T>) => void;
    onMouseOver?: (event: React.MouseEvent<T>) => void;
    onMouseOut?: (event: React.MouseEvent<T>) => void;
}

export interface KeyboardEventProps<T extends Element = Element> {
    onKeyDown?: (event: React.KeyboardEvent<T>) => void;
    onKeyPress?: (event: React.KeyboardEvent<T>) => void;
    onKeyUp?: (event: React.KeyboardEvent<T>) => void;
}

export interface DragEventProps<T extends Element = Element> {
    onDrag?: (event: React.DragEvent<T>) => void;
    onDragEnd?: (event: React.DragEvent<T>) => void;
    onDragEnter?: (event: React.DragEvent<T>) => void;
    onDragExit?: (event: React.DragEvent<T>) => void;
    onDragLeave?: (event: React.DragEvent<T>) => void;
    onDragOver?: (event: React.DragEvent<T>) => void;
    onDragStart?: (event: React.DragEvent<T>) => void;
    onDrop?: (event: React.DragEvent<T>) => void;
    draggable?: boolean;
}
