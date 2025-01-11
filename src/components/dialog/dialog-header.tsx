"use client";

import type { PropsOf, TVCProps } from "../../types";
import { Icon } from "../icons";
import { IconButton } from "../input";
import { tv } from "tailwind-variants";
import { Title } from "../text";

const dialogHeader = tv({
    base: "flex items-center px-6 pt-5 pb-4 gap-2 box-border",
    variants: {},
    defaultVariants: {},
});

interface DialogHeaderProps extends Omit<TVCProps<typeof dialogHeader, "div">, "title"> {
    closeIcon?: React.ReactNode;
    onClose?: () => void;
    title?: React.ReactNode;
    icon?: React.ReactNode;
    iconProps?: PropsOf<typeof Icon>;
    titleProps?: PropsOf<typeof Title>;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({
    title,
    className,
    onClose,
    closeIcon,
    icon,
    iconProps,
    titleProps,
    ...props
}) => {
    return (
        <div className={dialogHeader({ className })} style={props.style}>
            {icon && (
                <Icon size="lg" {...iconProps}>
                    {icon}
                </Icon>
            )}
            {typeof title === "string" ? (
                <Title bold={false} variant="h3" {...titleProps}>
                    {title}
                </Title>
            ) : (
                title
            )}
            {onClose && (
                <IconButton onClick={() => onClose()} variant="text" color="neutral" className="ml-auto">
                    {closeIcon || "×"}
                </IconButton>
            )}
        </div>
    );
};
