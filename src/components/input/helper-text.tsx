import { tv, type ClassValue } from "tailwind-variants";
import { withPrefix } from "../../util/system";
import React from "react";
import type { TVCProps, XStyleProps } from "../../types";

const helperText = tv({
    base: "text-sm/6 text-2",
    variants: {
        italic: {
            true: "italic",
        },
    },
    defaultVariants: {},
});

interface HelperTextProps extends Omit<TVCProps<typeof helperText, "p">, "className">, XStyleProps {
    className?: ClassValue;
    children?: React.ReactNode;
}

export const HelperText = React.forwardRef<HTMLParagraphElement, HelperTextProps>(
    ({ children, className, italic, ...props }, ref) => {
        return (
            <p ref={ref} className={helperText({ className, italic })} {...props}>
                {children}
            </p>
        );
    }
);

HelperText.displayName = withPrefix("HelperText");
