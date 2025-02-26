import { tv } from "tailwind-variants";
import { withPrefix } from "../../util/system";
import React from "react";
import type { TVCProps, StyleProps } from "../../types";

const helperText = tv({
    base: "text-sm text-t2 leading-4",
    variants: {
        italic: {
            true: "italic",
        },
    },
    defaultVariants: {},
});

interface HelperTextProps extends Omit<TVCProps<typeof helperText, "p">, "className">, StyleProps {
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
