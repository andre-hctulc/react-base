import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types";

const toolbar = tv({
    base: "flex",
    variants: {
        direction: {
            row: "flex-row",
            col: "flex-col",
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
            true: "flex-grow",
        },
        wrap: {
            true: "flex-wrap",
        },
    },
    defaultVariants: {
        gap: "md",
        align: "center",
        direction: "row",
    },
});

interface ToolbarProps extends TVCProps<typeof toolbar, "div"> {
    children?: React.ReactNode;
    stopEventPropagation?: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
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
    ...props
}) => {
    return (
        <div
            className={toolbar({
                className,
                direction,
                padding,
                grow,
                gap,
                align,
                justify,
                wrap,
            })}
            onClick={
                stopEventPropagation
                    ? (e) => {
                          e.stopPropagation();
                          props.onClick?.(e);
                      }
                    : undefined
            }
            {...props}
        >
            {children}
        </div>
    );
};
