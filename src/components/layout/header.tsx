import React from "react";
import { tv, type VariantProps, type ClassValue } from "tailwind-variants";
import { withPrefix } from "../../util/system";

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
        sticky: { true: "sticky top-0 z-10" },
    },
    defaultVariants: {
        variant: "elevated",
    },
});

interface HeaderProps extends VariantProps<typeof header> {
    children?: React.ReactNode;
    className?: ClassValue;
    style?: React.CSSProperties;
}

/**
 * ### Props
 * - `variant`
 * - `shadow-sm`
 */
export const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
    ({ children, variant, className, style, sticky, shadow }, ref) => {
        return (
            <div ref={ref} className={header({ className, variant, shadow, sticky })} style={style}>
                {children}
            </div>
        );
    }
);

Header.displayName = withPrefix("Header");
