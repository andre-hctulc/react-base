import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { tv } from "tailwind-variants";
const root = tv({
    base: "max-w-full box-border flex",
    variants: {
        variant: {
            grow: "grow",
            full_width: "w-full",
        },
        direction: {
            row: "flex-row",
            col: "flex-col",
            mix: "flex-col lg:flex-row",
            mix_inverse: "flex-col lg:flex-row-reverse",
        },
        minHeight0: {
            true: "min-h-0",
        },
        grow: {
            true: "grow",
        },
        scroll: {
            true: "overflow-y-auto",
            false: "",
        },
        heightScreen: {
            true: "h-screen",
        },
        fullHeight: {
            true: "h-full",
        },
        maxHeightFull: {
            true: "max-h-full",
        },
        relative: {
            true: "relative",
        },
    },
    defaultVariants: {
        direction: "col",
        grow: true,
        scroll: false,
        variant: "full_width",
    },
});
/**
 * A flex container. Use it for the general layout.
 */
export const Root = ({ children, className, direction, scroll, fullHeight, heightScreen, maxHeightFull, variant, grow, minHeight0, relative, }) => {
    return (_jsx("div", { className: root({
            className,
            variant,
            scroll,
            heightScreen,
            fullHeight,
            grow,
            direction,
            maxHeightFull,
            minHeight0,
            relative,
        }), children: children }));
};
