import { type FC, type Ref } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { StyleProps } from "../../types/index.js";

const pageContent = tv({
    base: "max-w-full box-border",
    variants: {
        minHeight: {
            "0": "min-h-0",
            auto: "",
        },
        width: {
            full: "w-full",
            none: "",
            auto: "w-auto",
        },
        padding: {
            none: "",
            sm: "p-2 md:p-4",
            md: "p-4 md:p-7",
            lg: "p-7 md:p-11",
            xl: "p-10 md:p-15",
        },
        justifyContent: {
            center: "justify-center",
            start: "justify-start",
            end: "justify-end",
        },
        alignItems: {
            center: "items-center",
            start: "items-start",
            end: "items-end",
        },
        flex: {
            row: "flex",
            col: "flex flex-col",
        },
        grow: {
            true: "grow",
        },
        height: {
            full: "h-full",
            screen: "h-screen",
            auto: "",
        },
        maxHeight: {
            full: "max-h-full",
            auto: "",
        },
    },
    defaultVariants: {
        padding: "md",
        width: "full",
    },
});

interface PageContentProps extends StyleProps, VariantProps<typeof pageContent> {
    children?: React.ReactNode;
    ref?: Ref<HTMLElement>;
}

/**
 * Use this inside a `Page` component to display page content.
 */
export const PageContent: FC<PageContentProps> = ({
    children,
    className,
    padding,
    minHeight,
    maxHeight,
    height,
    flex,
    width,
    grow,
    alignItems,
    justifyContent,
    ref,
    style,
}) => {
    return (
        <main
            style={style}
            className={pageContent({
                className,
                alignItems,
                justifyContent,
                width,
                padding,
                flex,
                minHeight,
                maxHeight,
                height,
                grow,
            })}
            ref={ref}
        >
            {children}
        </main>
    );
};
