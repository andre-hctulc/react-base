import React from "react";
import { tv, type VariantProps, type ClassValue } from "tailwind-variants";
import { withPrefix } from "../../util/system";

const header = tv({
    base: "w-full max-w-full box-border",
    variants: {},
});

interface HeaderProps extends VariantProps<typeof header> {
    children?: React.ReactNode;
    className?: ClassValue;
    style?: React.CSSProperties;
    sticky?: boolean;
}

export const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
    ({ children, className, style, sticky }, ref) => {
        return (
            <div
                ref={ref}
                className={header({ className: [className, sticky && "sticky top-0"] })}
                style={style}
            >
                {children}
            </div>
        );
    }
);

Header.displayName = withPrefix("Header");
