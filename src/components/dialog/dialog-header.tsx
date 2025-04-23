"use client";

import type { PropsOf, TVCProps } from "../../types/index.js";
import { Icon } from "../icons/icon.js";
import { IconButton } from "../input/icon-button.js";
import { tv } from "tailwind-variants";
import { Title } from "../text/title.js";
import type { FC, ReactNode } from "react";

const dialogHeader = tv({
    base: "flex items-center gap-2 box-border",
    variants: {
        size: {
            none: "",
            xs: "px-2 py-2",
            sm: "px-4 py-3",
            md: "px-6 py-5",
            lg: "px-8 py-6",
            xl: "px-10 py-8",
        },
        border: {
            true: "border-b",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

export interface DialogHeaderProps extends Omit<TVCProps<typeof dialogHeader, "div">, "title"> {
    closeIcon?: ReactNode;
    onClose?: () => void;
    title?: ReactNode;
    icon?: ReactNode;
    iconProps?: PropsOf<typeof Icon>;
    titleProps?: PropsOf<typeof Title>;
    actions?: ReactNode;
}

/**
 * The header of a dialog.
 *
 * Use it with `Dialog` or `Popover`.
 */
export const DialogHeader: FC<DialogHeaderProps> = ({
    title,
    className,
    onClose,
    closeIcon,
    icon,
    iconProps,
    titleProps,
    size,
    actions,
    border,
    ...props
}) => {
    return (
        <div className={dialogHeader({ className, size, border })} style={props.style}>
            {icon && (
                <Icon size="lg" {...iconProps}>
                    {icon}
                </Icon>
            )}
            {(!!actions || !!title) && (
                <div className="w-full flex flex-row items-center">
                    {typeof title === "string" ? (
                        <Title bold={false} variant="h3" {...titleProps}>
                            {title}
                        </Title>
                    ) : (
                        title
                    )}
                    {actions && <div className="ml-auto min-w-0">{actions}</div>}
                </div>
            )}
            {onClose && (
                <IconButton onClick={() => onClose()} variant="text" color="neutral" className="ml-auto">
                    {closeIcon || "×"}
                </IconButton>
            )}
        </div>
    );
};
