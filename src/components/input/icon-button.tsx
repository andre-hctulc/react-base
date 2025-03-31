import { type FC } from "react";
import type { PropsOf } from "../../types/index.js";
import { Button } from "./button.js";
import { tv } from "tailwind-variants";
import { Spinner } from "../data-display/spinner.js";

const iconButton = tv({
    base: "p-0!",
    variants: {
        size: {
            xs: "w-5 max-w-5",
            sm: "w-7 max-w-7",
            md: "w-9 max-w-9",
            lg: "w-[42px] max-w-[42px]",
            xl: "w-12 max-w-12",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

export interface IconButtonProps extends Omit<PropsOf<typeof Button>, "icon"> {}

export const IconButton: FC<IconButtonProps> = ({
    children,
    className,
    loading,
    disabled,
    size,
    ...props
}) => {
    return (
        <Button
            color="neutral"
            variant="text"
            className={iconButton({ className, size })}
            disabled={loading || disabled}
            size={size}
            {...props}
        >
            {loading ? <Spinner color="inherit" size="inherit" /> : children}
        </Button>
    );
};
