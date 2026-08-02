"use client";

import { cloneElement, isValidElement, type FC, type ReactNode, type ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/util/cn.js";

const iconVariants = cva("", {
    variants: {
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
            error: "text-error",
        },
        inline: {
            true: "inline",
            false: "",
            "inline-flex": "inline-flex",
        },
        noShrink: {
            true: "shrink-0",
            false: "",
        },
    },
    defaultVariants: {
        size: "inherit",
        color: "inherit",
    },
});

export type IconFC = FC<ComponentProps<"svg">>;
export type IconFCProps = ComponentProps<"svg">;
export type IconLike = IconFC | ReactNode;

export interface IconProps
    extends Omit<IconFCProps, "color" | "children">, VariantProps<typeof iconVariants> {
    children?: IconLike;
}

export const Icon: FC<IconProps> = ({ className, children, size, color, inline, noShrink, ...restProps }) => {
    const resolvedClass = cn(iconVariants({ size, color, inline, noShrink }), className);

    if (typeof children === "function") {
        const IconComp: IconFC = children;
        return <IconComp className={resolvedClass} {...(restProps as IconFCProps)} />;
    }

    if (isValidElement(children)) {
        return cloneElement<any>(children, {
            className: cn((children.props as any)?.className, resolvedClass),
            ...restProps,
        });
    }

    return (
        <span className={resolvedClass} {...(restProps as ComponentProps<"span">)}>
            {children}
        </span>
    );
};
