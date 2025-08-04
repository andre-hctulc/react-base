import React, { type FC, type Ref } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { StyleProps } from "../../types/index.js";

const page = tv({
    base: "box-border w-full min-h-0",
    variants: {
        sticky: {
            true: "sticky top-0 z-10",
        },
        size: {
            "4xs": "max-w-xl mx-auto",
            "3xs": "max-w-2xl mx-auto",
            "2xs": "max-w-3xl mx-auto",
            xs: "max-w-4xl mx-auto",
            sm: "max-w-5xl mx-auto",
            md: "max-w-6xl mx-auto",
            lg: "max-w-7xl mx-auto",
            xl: "max-w-8xl mx-auto",
            full_width: "w-full",
        },
        variant: {
            default: "",
            flex_row: "flex",
            flex_col: "flex flex-col",
            center: "flex items-center justify-center",
        },
        shrink: {
            true: "shrink-1",
            false: "shrink-0",
        },
        grow: {
            true: "grow",
        },
        maxHeightFull: {
            true: "max-h-full",
        },
        minHeight0: {
            true: "min-h-0",
        },
        fullHeight: {
            true: "h-full",
        },
        flex: {
            row: "flex",
            col: "flex flex-col",
        },
        bg: {
            none: "",
            "1": "bg-paper",
            "2": "bg-paper2",
            "3": "bg-paper3",
            "4": "bg-paper4",
        },
    },
    defaultVariants: {
        size: "lg",
        variant: "default",
        shrink: false,
    },
});

interface PageProps extends VariantProps<typeof page>, StyleProps {
    children?: React.ReactNode;
    ref?: Ref<HTMLDivElement>;
    id?: string;
}

/**
 * A `Page` vertically centers its content. Generally there should only be one `Page` per route.
 */
export const Page: FC<PageProps> = ({
    children,
    variant,
    className,
    grow,
    size,
    maxHeightFull,
    minHeight0,
    fullHeight,
    style,
    flex,
    shrink,
    ref,
    sticky,
    bg,
    id,
}) => {
    return (
        <div
            className={page({
                size,
                flex,
                shrink,
                className,
                grow,
                maxHeightFull,
                minHeight0,
                fullHeight,
                variant,
                sticky,
                bg,
            })}
            ref={ref}
            style={style}
            id={id}
        >
            {children}
        </div>
    );
};

/**
 * {@link Page} alias
 */
export const PageLike = Page;
