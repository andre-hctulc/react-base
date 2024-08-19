import type clsx from "clsx";
import type React from "react";

export type Falsy = null | undefined | "" | 0 | false;

export type Align = "start" | "end" | "center" | "none";

// --- Props

export type PropsOf<T extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
    React.ComponentProps<T>;

export type PartialPropsOf<T extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
    Partial<PropsOf<T>>;

export interface StyleProps {
    style?: React.CSSProperties;
    className?: clsx.ClassValue;
}

export type EventProps = {
    [K in Extract<
        keyof React.DOMAttributes<HTMLElement>,
        `on${Capitalize<string>}`
    >]?: React.DOMAttributes<HTMLElement>[K];
};

export type SlotProps<C extends Record<string, any>> = {
    slotProps?: { [K in keyof C]?: Partial<PropsOf<C[K]>> };
    slots?: { [K in keyof C]?: React.ReactNode };
};

export interface ChildrenProps {
    children?: React.ReactNode;
}

export interface RequiredChildrenProps {
    children: React.ReactNode;
}
