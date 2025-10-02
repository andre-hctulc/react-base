import { tv } from "tailwind-variants";
import { type FC } from "react";
import type { ELEMENT, RichAsProps, WithTVProps } from "../../types/index.js";

const toolbar = tv({
    base: "flex min-w-0",
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
            none: "",
            normal: "",
            start: "justify-start",
            end: "justify-end",
            center: "justify-center",
            between: "justify-between",
            around: "justify-around",
            evenly: "justify-evenly",
        },
        align: {
            none: "",
            normal: "",
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
        noShrink: {
            true: "shrink-0",
        },
        mlAuto: {
            true: "ml-auto",
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

type ToolbarProps<T extends ELEMENT = "div"> = WithTVProps<
    RichAsProps<T> & {
        stopEventPropagation?: boolean;
        as?: any;
    },
    typeof toolbar
>;

/**
 * ### Props
 * - `stopEventPropagation`
 */
export const Toolbar: FC<ToolbarProps> = ({
    children,
    direction,
    gap,
    padding,
    className,
    justify,
    align,
    grow,
    wrap,
    stopEventPropagation,
    scroll,
    ref,
    noShrink,
    mlAuto,
    ...props
}) => {
    const Comp: any = props.as || "div";

    return (
        <Comp
            className={toolbar({
                className,
                direction,
                padding,
                grow,
                gap,
                align,
                justify,
                wrap,
                scroll,
                noShrink,
                mlAuto,
            })}
            ref={ref as any}
            onClick={
                stopEventPropagation
                    ? (e: React.MouseEvent<any>) => {
                          e.stopPropagation();
                          props.onClick?.(e);
                      }
                    : undefined
            }
            {...props}
        >
            {children}
        </Comp>
    );
};
