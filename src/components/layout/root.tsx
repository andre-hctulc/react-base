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
    },
    defaultVariants: {
        direction: "col",
    },
});

interface RootProps extends VariantProps<typeof root> {
    children?: React.ReactNode;
    className?: ClassValue;
    scroll?: boolean;
    fullHeight?: boolean;
    hScreen?: boolean;
}

export const Root: React.FC<RootProps> = ({
    children,
    className,
    direction,
    scroll,
    fullHeight: hFull,
    hScreen,
    ...props
}) => {
    return (
        <div
            className={root({
                className: [
                    scroll && "overflow-y-auto overflow-x-hidden",
                    hScreen && "h-screen",
                    hFull && "h-full",
                    className,
                ],
                direction,
            })}
        >
            {children}
        </div>
    );
};
