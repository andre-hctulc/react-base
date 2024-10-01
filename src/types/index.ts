import type clsx from "clsx";
import type React from "react";

export type Falsy = null | undefined | "" | 0 | false;

export type Align = "start" | "end" | "center" | "none";

export type Size = "s" | "m" | "l";
export type XSize = "xs" | "s" | "m" | "l" | "xl";
export type XXSize = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";

// --- Props

export type PropsOf<T extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
    React.ComponentProps<T>;

export type PartialPropsOf<T extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
    Partial<PropsOf<T>>;

export interface StyleProps {
    style?: React.CSSProperties;
    className?: clsx.ClassValue;
}

export interface ChildrenProps {
    children?: React.ReactNode;
}

export interface RequiredChildrenProps {
    children: React.ReactNode;
}
