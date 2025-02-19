import { jsx as _jsx } from "react/jsx-runtime";
import { tv } from "tailwind-variants";
import { forwardRef } from "react";
import { withPrefix } from "../../util/system";
const toolbar = tv({
    base: "flex",
    variants: {
        direction: {
            row: "flex-row",
            col: "flex-col",
        },
        scroll: {
            true: "",
        },
        gap: {
            xs: "gap-1",
            sm: "gap-2",
            md: "gap-3",
            lg: "gap-5",
            xl: "gap-6",
            "2xl": "gap-8",
        },
        padding: {
            none: "p-0",
            sm: "p-2",
            md: "p-3",
            lg: "p-4",
        },
        justify: {
            start: "justify-start",
            end: "justify-end",
            center: "justify-center",
            between: "justify-between",
            around: "justify-around",
            evenly: "justify-evenly",
        },
        align: {
            start: "items-start",
            end: "items-end",
            center: "items-center",
            baseline: "items-baseline",
            stretch: "items-stretch",
        },
        grow: {
            true: "grow",
        },
        wrap: {
            true: "flex-wrap",
        },
    },
    compoundVariants: [
        { direction: "col", scroll: true, className: "overflow-y-auto" },
        { direction: "row", scroll: true, className: "overflow-x-auto" },
    ],
    defaultVariants: {
        gap: "md",
        align: "center",
        direction: "row",
    },
});
export const Toolbar = forwardRef(({ children, direction, gap, padding, className, justify, align, grow, wrap, stopEventPropagation, scroll, ...props }, ref) => {
    const Comp = props.as || "div";
    return (_jsx(Comp, { className: toolbar({
            className,
            direction,
            padding,
            grow,
            gap,
            align,
            justify,
            wrap,
            scroll,
        }), ref: ref, onClick: stopEventPropagation
            ? (e) => {
                e.stopPropagation();
                props.onClick?.(e);
            }
            : undefined, ...props, children: children }));
});
Toolbar.displayName = withPrefix("Toolbar");
