import type clsx from "clsx";
import type React from "react";
import type { ClassValue, VariantProps } from "tailwind-variants";

export type Falsy = null | undefined | "" | 0 | false;

export type Align = "start" | "end" | "center" | "none";

export type Size = "s" | "m" | "l";
export type XSize = "xs" | "s" | "m" | "l" | "xl";
export type XXSize = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";

// --- Props

/**
 * Alias for `React.ComponentProps<T>`.
 */
export type PropsOf<T extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
    React.ComponentProps<T>;

export type PartialPropsOf<T extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
    Partial<PropsOf<T>>;

export interface StyleProps {
    style?: React.CSSProperties;
    className?: string;
}

export interface XStyleProps {
    style?: React.CSSProperties;
    className?: ClassValue;
}

export interface ChildrenProps {
    children?: React.ReactNode;
}

export interface RequiredChildrenProps {
    children: React.ReactNode;
}

/**
 * A Helper type for a `tailwind-variants` component's props.
 * It bundles the variant props with the root element's props.
 * Additionally props can be excluded from the root element's props.
 * @template T Tailwind CSS variant object
 * @template R Root element type
 * @template O Whether to exclude `className` prop or the given props.
 */
export type TVCProps<
    T extends (...args: any) => any,
    R extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any> | never = never
> = VariantProps<T> & Omit<React.ComponentProps<R>, "className"> & XStyleProps;
