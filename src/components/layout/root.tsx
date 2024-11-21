import type React from "react";
import { tv, type ClassValue, type VariantProps } from "tailwind-variants";

const root = tv({
    base: "w-full max-w-full box-border flex flex-col flex-grow min-h-0",
    variants: {
        direction: {
            row: "flex-row",
            col: "flex-col",
            mix: "flex-col lg:flex-row",
            mix_inverse: "flex-col lg:flex-row-reverse",
        },
        grow: {
            true: "flex-grow",
        },
        scroll: {
            true: "overflow-y-auto overflow-x-hidden",
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
    },
    defaultVariants: {
        direction: "col",
    },
});

interface RootProps extends VariantProps<typeof root> {
    children?: React.ReactNode;
    className?: ClassValue;
}

/**
 * A flex container. Use it for the general layout.
 */
export const Root: React.FC<RootProps> = ({
    children,
    className,
    direction,
    scroll,
    fullHeight,
    heightScreen,
    maxHeightFull,
    grow,
}) => {
    return (
        <div
            className={root({
                className,
                scroll,
                heightScreen,
                fullHeight,
                grow,
                direction,
                maxHeightFull,
            })}
        >
            {children}
        </div>
    );
};
