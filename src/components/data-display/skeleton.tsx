import React from "react";
import { tv, type ClassValue, type VariantProps } from "tailwind-variants";

const skeleton = tv({
    base: "animate-skeleton",
    variants: {
        rounded: {
            sm: "rounded-sm",
            base: "rounded",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            "2xl": "rounded-2xl",
            "3xl": "rounded-3xl",
            full: "rounded-full",
        },
    },
});

interface SkeletonProps extends VariantProps<typeof skeleton> {
    className?: ClassValue;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({ children, className, rounded, style }) => {
    return (
        <div className={skeleton({ className, rounded })} style={style}>
            {children}
        </div>
    );
};
