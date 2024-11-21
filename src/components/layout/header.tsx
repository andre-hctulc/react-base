import React from "react";
import { tv, type VariantProps, type ClassValue } from "tailwind-variants";
import { withPrefix } from "../../util/system";

const header = tv({
    base: "w-full max-w-full box-border",
    variants: {
        variant: {
            elevated: "bg-elevated",
            border: "border-b",
            custom: "",
        },
        shadow: {
            none: "",
            sm: "shadow-sm",
            base: "shadow",
            md: "shadow-md",
            lg: "shadow-lg",
            xl: "shadow-xl",
            "2xl": "shadow-2xl",
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
    sticky?: boolean;
}

/**
 * ### Props
 * - `variant`
 * - `shadow`
 */
export const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
    ({ children, variant, className, style, sticky, shadow }, ref) => {
        return (
            <div
                ref={ref}
                className={header({ className: [className, sticky && "sticky top-0"], variant, shadow })}
                style={style}
            >
                {children}
            </div>
        );
    }
);

Header.displayName = withPrefix("Header");
