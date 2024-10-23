import React from "react";
import { tv, type ClassValue, type VariantProps } from "tailwind-variants";
import { withPrefix } from "../../util/system";

const drawer = tv({
    base: "fixed z-50",
    variants: {
        position: {
            left: "top-0 left-0 h-screen w-full md:w-64 max-w-full",
            right: "top-0 right-0 w-full md:w-64 max-w-full",
            bottom: "bottom-0 left-0 h-screen w-full md:h-64 max-h-full",
            top: "top-0 left-0 h-screen w-full md:h-64 max-h-full",
        },
    },
    defaultVariants: {
        position: "left",
    },
});

interface DrawerProps extends VariantProps<typeof drawer> {
    children?: React.ReactNode;
    className?: ClassValue;
    style?: React.CSSProperties;
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
    ({ children, position, className, style }, ref) => {
        return (
            <div ref={ref} className={drawer({ position, className })} style={style}>
                {children}
            </div>
        );
    }
);

Drawer.displayName = withPrefix("Drawer");
