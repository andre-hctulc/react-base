"use client";

import { type ComponentProps, type FC } from "react";
import { createTheme } from "flowbite-react";
import { type BaseTheme, type TProps, type WithSize } from "../../util/style.js";
import { useResolveT } from "../../hooks/index.js";
import type { FlowbiteColors } from "flowbite-react/types";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        dot: DotTheme;
    }

    interface FlowbiteProps {
        dot: Partial<WithoutThemingProps<DorProps>>;
    }
}

export interface DotTheme extends BaseTheme, WithSize {
    color: FlowbiteColors;
}

const dot = createTheme<DotTheme>({
    base: "rounded-full shrink-0",
    color: {
        blue: "bg-blue-500",
        green: "bg-green-500",
        gray: "bg-gray-500",
        red: "bg-red-500",
        yellow: "bg-yellow-500",
        purple: "bg-purple-500",
        pink: "bg-pink-500",
        indigo: "bg-indigo-500",
        teal: "bg-teal-500",
        cyan: "bg-cyan-500",
        dark: "bg-dark-500",
        light: "bg-light-500",
        failure: "bg-failure-500",
        success: "bg-success-500",
        warning: "bg-warning-500",
        info: "bg-info-500",
        primary: "bg-primary-500",
        secondary: "bg-secondary-500",
        tertiary: "bg-tertiary-500",
        lime: "bg-lime-500",
    },
    size: {
        xs: "size-1",
        sm: "size-2",
        md: "size-4",
        lg: "size-6",
        xl: "size-8",
        "2xl": "size-10",
        "3xl": "size-12",
        "4xl": "size-16",
        "5xl": "size-20",
        "6xl": "size-24",
        "7xl": "size-32",
    },
    defaultVariants: {
        color: "gray",
        size: "md",
    },
});

interface DorProps extends Omit<ComponentProps<"span">, "color" | "size">, TProps<DotTheme> {}

/**
 * ### Props
 * - `embedded` - Controls vertical padding. Use it in combination with card header and footer
 */
export const Dot: FC<DorProps> = (props) => {
    const { className, restProps, children } = useResolveT("dot", dot, props);

    return (
        <span className={className} {...(restProps as any)}>
            {children}
        </span>
    );
};
