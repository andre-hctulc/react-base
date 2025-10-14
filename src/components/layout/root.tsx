import type { CSSProperties, FC, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const root = tv({
    base: "max-w-full box-border flex",
    variants: {
        direction: {
            row: "flex-row",
            col: "flex-col",
            mix: "flex-col lg:flex-row",
            mix_inverse: "flex-col lg:flex-row-reverse",
        },
        minHeight: {
            "0": "min-h-0",
            auto: "",
        },
        grow: {
            true: "grow",
        },
        scroll: {
            true: "overflow-y-auto",
            false: "",
        },
        height: {
            screen: "h-screen",
            full: "h-full",
            auto: "",
        },
        maxHeight: {
            full: "max-h-full",
            auto: "",
        },
        relative: {
            true: "relative",
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
        direction: "col",
        grow: true,
        scroll: false,
    },
});

interface RootProps extends VariantProps<typeof root> {
    children?: ReactNode;
    style?: CSSProperties;
    className?: string;
    id?: string;
}

/**
 * A flex container. Use it as contextual root container for your layout.
 */
export const Root: FC<RootProps> = ({
    children,
    className,
    direction,
    scroll,
    height,
    grow,
    minHeight,
    maxHeight,
    relative,
    style,
    bg,
    id,
}) => {
    return (
        <div
            id={id}
            className={root({
                className,
                scroll,
                height,
                minHeight,
                maxHeight,
                grow,
                direction,
                relative,
                bg,
            })}
            style={style}
        >
            {children}
        </div>
    );
};
