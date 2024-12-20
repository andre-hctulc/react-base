import React from "react";
import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types";
import { withPrefix } from "../../util/system";

const flex = tv({
    base: "flex",
    variants: {
        direction: {
            row: "flex-row",
            col: "flex-col",
            row_reverse: "flex-row-reverse",
            col_reverse: "flex-col-reverse",
        },
        align: {
            start: "items-start",
            center: "items-center",
            end: "items-end",
            baseline: "items-baseline",
            stretch: "items-stretch",
        },
        justify: {
            start: "justify-start",
            center: "justify-center",
            end: "justify-end",
            between: "justify-between",
            around: "justify-around",
        },
        wrap: {
            none: "flex-no-wrap",
            normal: "flex-wrap",
            reverse: "flex-wrap-reverse",
        },
        grow: {
            true: "flex-grow",
        },
    },
    defaultVariants: {
        direction: "row",
    },
});

interface FlexProps extends TVCProps<typeof flex, "div"> {}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
    ({ children, className, direction, align, justify, wrap, grow, ...props }, ref) => {
        return (
            <div ref={ref} className={flex({ className, direction, align, justify, wrap, grow })} {...props}>
                {children}
            </div>
        );
    }
);

Flex.displayName = withPrefix("Flex");
