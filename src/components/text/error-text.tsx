import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types";
import React from "react";
import { withPrefix } from "../../util/system";

const errorText = tv({
    base: "text-error",
    variants: {
        size: {
            sm: "text-sm",
            base: "text-base",
        },
        mb: {
            none: "mb-0",
            sm: "mb-1",
            md: "mb-2",
            lg: "mb-3",
            xl: "mb-5",
        },
        mt: {
            none: "mt-0",
            sm: "mt-1",
            md: "mt-2",
            lg: "mt-3",
            xl: "mt-5",
        },
        my: {
            none: "my-0",
            sm: "my-1",
            md: "my-2",
            lg: "my-3",
            xl: "my-5",
        },
    },
    defaultVariants: {
        size: "sm",
    },
});

interface ErrorTextProps extends TVCProps<typeof errorText, "p"> {
    name?: string;
    as?: any;
}

/**
 * ### Props
 * - `name` - The name of the input field this error is for. If provided the error will be displayed only if the input field is invalid.
 */
export const ErrorText = React.forwardRef<HTMLElement, ErrorTextProps>(
    ({ children, className, name, mb, my, mt, as, size, ...props }, ref) => {
        const Comp = as || "p";

        return (
            <Comp ref={ref} className={errorText({ className, my, mt, mb, size })} {...props}>
                {children}
            </Comp>
        );
    }
);

ErrorText.displayName = withPrefix("ErrorText");
