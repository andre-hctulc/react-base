import type React from "react";
import type { ClassValue, VariantProps } from "tailwind-variants";

export type Falsy = null | undefined | "" | 0 | false;

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
 * @template T tailwind-variant object
 * @template R Root element type
 */
export type TVCProps<
    T extends (...args: any) => any,
    R extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any> | never = never
> = VariantProps<T> & Omit<React.ComponentProps<R>, "className"> & XStyleProps;

// -- Components

export type LinkComponent = React.ComponentType<{ href: any; className?: string }>;
