import type { CSSProperties, FC, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

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
        bg: {
            none: "",
            paper: "bg-paper",
            paper2: "bg-paper2",
            paper3: "bg-paper3",
            paper4: "bg-paper4",
        },
    },
    defaultVariants: {
        direction: "col",
        grow: true,
        scroll: false,
        variant: "full_width",
    },
});

interface RootProps extends VariantProps<typeof root> {
    children?: ReactNode;
    style?: CSSProperties;
    className?: string;
}

/**
 * A flex container. Use it as contextual root container for your layout.
 */
export const Root: FC<RootProps> = ({
    children,
    className,
    direction,
    scroll,
    fullHeight,
    heightScreen,
    maxHeightFull,
    variant,
    grow,
    minHeight0,
    relative,
    style,
    bg,
}) => {
    return (
        <div
            className={root({
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
                bg,
            })}
            style={style}
        >
            {children}
        </div>
    );
};
