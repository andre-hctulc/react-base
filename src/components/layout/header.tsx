import React, { type FC, type Ref } from "react";
import { tv, type VariantProps, type ClassValue } from "tailwind-variants";

const header = tv({
    base: "w-full max-w-full box-border shrink-0",
    variants: {
        variant: {
            elevated: "bg-paper2",
            border: "bg-paper border-b",
            custom: "",
        },
        shadow: {
            none: "",
            sm: "shadow-xs",
            base: "shadow-sm",
            md: "shadow-md",
            lg: "shadow-lg",
            xl: "shadow-xl",
            "2xl": "shadow-2xl",
        },
        sticky: { true: "sticky top-0" },
        zIndex: {
            "10": "z-10",
            "20": "z-20",
            "30": "z-30",
            "40": "z-40",
            "50": "z-50",
        },
    },
    defaultVariants: {
        variant: "elevated",
    },
});

interface HeaderProps extends VariantProps<typeof header> {
    children?: React.ReactNode;
    className?: ClassValue;
    style?: React.CSSProperties;
    as?: any;
    ref?: Ref<HTMLElement>;
}

/**
 * ### Props
 * - `variant`
 * - `shadow-sm`
 */
export const Header: FC<HeaderProps> = ({
    children,
    variant,
    className,
    style,
    sticky,
    shadow,
    as,
    ref,
    zIndex,
}) => {
    const Comp = as || "div";
    return (
        <Comp ref={ref} className={header({ className, variant, shadow, sticky, zIndex })} style={style}>
            {children}
        </Comp>
    );
};
