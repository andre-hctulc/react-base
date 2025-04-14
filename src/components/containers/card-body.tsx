import { tv, type VariantProps } from "tailwind-variants";
import { type FC, type ReactNode } from "react";

const cardBody = tv({
    base: "grow max-h-full min-h-0 overflow-auto",
    variants: {
        size: {
            none: "",
            xs: "p-1.5",
            sm: "py-2 px-2.5",
            md: "py-3 px-3.5",
            lg: "py-5 px-6",
            xl: "py-7 px-8",
            "2xl": "p-12",
        },
        embedded: {
            true: "!py-0",
            footer: "!pb-0",
            header: "!pt-0",
        },
        flex: {
            col: "flex flex-col",
            row: "flex",
        },
        scroll: {
            true: "overflow-y-auto",
        },
        grow: {
            true: "grow",
        },
        fullHeight: {
            true: "h-full",
        },
        alignItems: {
            center: "items-center",
            start: "items-start",
            end: "items-end",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

interface CardBodyProps extends VariantProps<typeof cardBody> {
    children?: ReactNode;
    className?: string;
    as?: any;
}

/**
 * ### Props
 * - `embedded` - Controls vertical padding. Use it in combination with card header and footer
 */
export const CardBody: FC<CardBodyProps> = ({
    children,
    className,
    flex,
    as,
    size,
    grow,
    fullHeight,
    alignItems,
    scroll,
    embedded,
}) => {
    const Comp = as || "div";
    return (
        <Comp className={cardBody({ className, size, flex, grow, fullHeight, alignItems, scroll, embedded })}>
            {children}
        </Comp>
    );
};
