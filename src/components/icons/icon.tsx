"use client";

import { cloneElement, isValidElement, type FC, type ReactNode } from "react";
import { createTheme } from "flowbite-react/helpers/create-theme";
import type { BaseTheme, TProps, WithNoShrink } from "../../util/style.js";
import type { FlowbiteBoolean, FlowbiteColors, FlowbiteSizes } from "flowbite-react/types";
import { useResolveT } from "../../hooks/index.js";
import type { ComponentProps } from "react";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        icon: IconTheme;
    }
}

export interface IconTheme extends BaseTheme, WithNoShrink {
    size: FlowbiteSizes & Record<"none" | "inherit", string>;
    color: FlowbiteColors & {
        none: string;
        inherit: string;
        neutral: string;
        t2: string;
        t3: string;
        t4: string;
        black: string;
        white: string;
    };
    inline: FlowbiteBoolean & { "inline-flex": string };
}

const icon = createTheme<IconTheme>({
    base: "",
    size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
        "3xl": "text-3xl",
        "4xl": "text-4xl",
        "5xl": "text-5xl",
        "6xl": "text-6xl",
        "7xl": "text-7xl",
        none: "",
        inherit: "",
    },
    color: {
        // Standard Flowbite colors
        blue: "text-blue-600",
        cyan: "text-cyan-600",
        dark: "text-gray-800",
        failure: "text-red-600",
        success: "text-success",
        warning: "text-warning",
        gray: "text-gray-600",
        green: "text-green-600",
        indigo: "text-indigo-600",
        light: "text-gray-300",
        lime: "text-lime-600",
        pink: "text-pink-600",
        purple: "text-purple-600",
        red: "text-red-600",
        teal: "text-teal-600",
        yellow: "text-yellow-600",
        primary: "text-primary",
        secondary: "text-secondary",
        // Custom colors
        none: "",
        inherit: "text-inherit",
        neutral: "text-neutral",
        t2: "text-t2",
        t3: "text-t3",
        t4: "text-t4",
        black: "text-black",
        white: "text-white",
        accent: "text-accent",
        info: "text-info",
    },
    inline: {
        on: "inline",
        off: "",
        "inline-flex": "inline-flex",
    },
    noShrink: {
        on: "shrink-0",
        off: "",
    },
    defaultVariants: {
        size: "inherit",
        color: "inherit",
    },
});

export type IconFC = FC<ComponentProps<"svg">>;
export type IconFCProps = ComponentProps<"svg">;

export type IconLike = IconFC | ReactNode;

export interface IconProps extends Omit<IconFCProps, "color" | "children">, TProps<IconTheme> {
    children?: IconLike;
}

export const Icon: FC<IconProps> = (props) => {
    const { className, children, restProps } = useResolveT("icon", icon, props);

    // IconFC
    if (typeof children === "function") {
        const IconComp: IconFC = children;
        return <IconComp className={className} {...(restProps as IconFCProps)} />;
    }
    // svg
    else if (isValidElement(children)) {
        return cloneElement(children, {
            className,
            ...restProps,
        });
    }
    // fallback
    else {
        return (
            <span className={className} {...(restProps as ComponentProps<"span">)}>
                {children}
            </span>
        );
    }
};
