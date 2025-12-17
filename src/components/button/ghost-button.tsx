import { Button, type ButtonProps } from "flowbite-react";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import { type ElementType } from "react";

export type GhostButtonProps<T extends ElementType = "button"> = ButtonProps<T> & {
    ghost?: boolean;
    light?: boolean;
};

export const GhostButton = <T extends ElementType = "button">({
    children,
    className,
    ...props
}: GhostButtonProps<T>) => {
    return (
        <Button<"button"> className={twMerge("border-0", className)} outline {...props}>
            {children}
        </Button>
    );
};
