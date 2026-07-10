"use client";

import { createTheme } from "flowbite-react";
import type { FC } from "react";
import type { PropsOf } from "../../types/index.js";
import { useResolveT } from "../../hooks/index.js";
import { shapes, type BaseTheme, type TProps, type WithShape, type WithSize } from "../../util/style.js";
import type { FlowbiteBoolean, FlowbiteColors } from "flowbite-react/types";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        chip: ChipTheme;
    }

    interface FlowbiteProps {
        chip: Partial<WithoutThemingProps<ChipProps>>;
    }
}

export interface ChipTheme extends BaseTheme, WithShape, WithSize {
    color: FlowbiteColors;
    outline: FlowbiteBoolean;
}

const chip = createTheme<ChipTheme>({
    base: "inline-flex items-center gap-1 border border-transparent font-medium whitespace-nowrap",
    color: {
        blue: "bg-blue-100 text-blue-800 border-blue-200",
        green: "bg-green-100 text-green-800 border-green-200",
        gray: "bg-gray-100 text-gray-700 border-gray-200",
        red: "bg-red-100 text-red-800 border-red-200",
        yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
        purple: "bg-purple-100 text-purple-800 border-purple-200",
        pink: "bg-pink-100 text-pink-800 border-pink-200",
        indigo: "bg-indigo-100 text-indigo-800 border-indigo-200",
        teal: "bg-teal-100 text-teal-800 border-teal-200",
        cyan: "bg-cyan-100 text-cyan-800 border-cyan-200",
        dark: "bg-gray-900 text-white border-gray-900",
        light: "bg-light-100 text-light-900 border-light-200",
        failure: "bg-error-100 text-error-800 border-error-200",
        success: "bg-success-100 text-success-800 border-success-200",
        warning: "bg-warning-100 text-warning-800 border-warning-200",
        info: "bg-info-100 text-info-800 border-info-200",
        primary: "bg-primary-100 text-primary-800 border-primary-200",
        secondary: "bg-secondary-100 text-secondary-800 border-secondary-200",
        tertiary: "bg-tertiary-100 text-tertiary-800 border-tertiary-200",
        lime: "bg-lime-100 text-lime-800 border-lime-200",
    },
    size: {
        xs: "px-1.5 py-0.5 text-[10px]",
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-sm",
        lg: "px-3 py-1 text-sm",
        xl: "px-3.5 py-1.5 text-base",
        "2xl": "px-4 py-1.5 text-lg",
        "3xl": "px-4.5 py-2 text-xl",
        "4xl": "px-5 py-2 text-2xl",
        "5xl": "px-6 py-2.5 text-3xl",
        "6xl": "px-7 py-3 text-4xl",
        "7xl": "px-8 py-3 text-5xl",
    },
    shape: shapes,
    outline: {
        on: "bg-transparent",
        off: "",
    },
    defaultVariants: {
        color: "gray",
        size: "sm",
        shape: "circle",
        outline: false,
    },
});

export interface ChipProps extends Omit<PropsOf<"span">, "color">, TProps<ChipTheme> {}

export const Chip: FC<ChipProps> = (props) => {
    const { className, restProps, children } = useResolveT("chip", chip, props);

    return (
        <span className={className} {...restProps}>
            {children}
        </span>
    );
};
