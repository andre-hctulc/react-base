import { type FC, type ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn.util.js";
import { Slot } from "radix-ui";

const flexVariants = cva("flex", {
    variants: {
        direction: {
            row: "flex-row",
            row_reverse: "flex-row-reverse",
            col: "flex-col",
            col_reverse: "flex-col-reverse",
        },
        alignItems: {
            auto: "",
            start: "items-start",
            center: "items-center",
            end: "items-end",
            stretch: "items-stretch",
            baseline: "items-baseline",
        },
        justifyContent: {
            start: "justify-start",
            center: "justify-center",
            end: "justify-end",
            between: "justify-between",
            around: "justify-around",
        },
        wrap: {
            none: "flex-nowrap",
            normal: "flex-wrap",
            reverse: "flex-wrap-reverse",
        },
        grow: {
            true: "grow",
            false: "",
        },
        noShrink: {
            true: "shrink-0",
            false: "",
        },
        height: {
            full: "h-full",
            screen: "h-screen",
            auto: "h-auto",
            min: "h-min",
            max: "h-max",
            fit: "h-fit",
            "0": "h-0",
        },
        maxHeight: {
            full: "max-h-full",
            screen: "max-h-screen",
            auto: "max-h-auto",
            min: "max-h-min",
            max: "max-h-max",
            fit: "max-h-fit",
            "0": "max-h-0",
        },
        minHeight: {
            full: "min-h-full",
            screen: "min-h-screen",
            auto: "min-h-auto",
            min: "min-h-min",
            max: "min-h-max",
            fit: "min-h-fit",
            "0": "min-h-0",
        },
        width: {
            full: "w-full",
            screen: "w-screen",
            auto: "w-auto",
            min: "min-w-full",
            max: "max-w-full",
            fit: "w-fit",
            "0": "w-0",
        },
        maxWidth: {
            full: "max-w-full",
            screen: "max-w-screen",
            auto: "max-w-auto",
            min: "max-w-min",
            max: "max-w-max",
            fit: "max-w-fit",
            "0": "max-w-0",
        },
        minWidth: {
            full: "min-w-full",
            screen: "min-w-screen",
            auto: "min-w-auto",
            min: "min-w-min",
            max: "min-w-max",
            fit: "min-w-fit",
            "0": "min-w-0",
        },
    },
});

export interface FlexProps extends ComponentProps<"div">, VariantProps<typeof flexVariants> {
    asChild?: boolean;
}

export const Flex: FC<FlexProps> = (props) => {
    const {
        direction,
        alignItems,
        justifyContent,
        wrap,
        grow,
        noShrink,
        height,
        maxHeight,
        minHeight,
        width,
        maxWidth,
        minWidth,
        className,
        children,
        asChild,
        ...restProps
    } = props;
    const Comp: any = asChild ? Slot : "div";

    return (
        <Comp
            className={cn(
                flexVariants({
                    direction,
                    alignItems,
                    justifyContent,
                    wrap,
                    grow,
                    noShrink,
                    height,
                    maxHeight,
                    minHeight,
                    width,
                    maxWidth,
                    minWidth,
                }),
                className,
            )}
            {...restProps}
        >
            {children}
        </Comp>
    );
};

Flex.displayName = "Flex";
