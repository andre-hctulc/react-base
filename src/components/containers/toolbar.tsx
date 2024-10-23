import { tv, type ClassValue, type VariantProps } from "tailwind-variants";

const toolbar = tv({
    base: "flex",
    variants: {
        direction: {
            row: "flex-row",
            column: "flex-col",
        },
        size: {
            sm: "gap-2",
            md: "gap-3",
            lg: "gap-5",
        },
        padding: {
            none: "p-0",
            sm: "p-2",
            md: "p-3",
            lg: "p-4",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

interface ToolbarProps extends VariantProps<typeof toolbar> {
    children?: React.ReactNode;
    className?: ClassValue;
}

export const Toolbar: React.FC<ToolbarProps> = ({ children, direction, size, padding, className }) => {
    return <div className={toolbar({ direction, padding, className, size })}>{children}</div>;
};
