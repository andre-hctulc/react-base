import { Button, type ButtonProps } from "flowbite-react";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import { type ElementType } from "react";
import { Icon } from "../icons";

export type IconButtonProps<T extends ElementType = "button"> = ButtonProps<T> & {
    ghost?: boolean;
    light?: boolean;
};

export const IconButton = <T extends ElementType = "button">({
    children,
    className,
    ghost,
    color,
    light,
    ...props
}: IconButtonProps<T>) => {
    return (
        <Button<"button">
            color={ghost ? "" : color ?? (light ? "light" : "alternative")}
            className={twMerge(
                "aspect-square p-0!",
                ghost && "hover:bg-transparent1 ring-transparent2",
                className
            )}
            {...props}
        >
            <Icon size="none" className="text-[1.25em]" color={ghost ? color ?? "neutral" : undefined}>
                {children}
            </Icon>
        </Button>
    );
};
