import React from "react";
import { tv } from "tailwind-variants";
import type { PropsOf, TVCProps } from "../../types";
import { IconButton } from "../input";
import { XIcon } from "../icons/x";
import { Title } from "../text";
import clsx from "clsx";
const alert = tv({
    base: "px-3 py-2 text-contrast",
    variants: {
        type: {
            error: "bg-error/15 border-error text-error",
            success: "bg-success/15 border-success text-success",
            warning: "bg-warning/15 border-warning text.warning",
            info: "bg-info/15 border-info text-info",
        },
        outlined: {
            true: "border",
            false: "",
        },
        rounded: {
            sm: "rounded-sm",
            base: "rounded",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            none: "",
        },
    },
    defaultVariants: {
        type: "info",
        outlined: true,
        rounded: "md",
    },
});

interface AlertProps extends TVCProps<typeof alert, "div"> {
    as?: any;
    closable?: boolean;
    onClose?: () => void;
    closeButtonProps?: PropsOf<typeof IconButton>;
    title?: string;
    titleProps?: PropsOf<typeof Title>;
    loading?: boolean;
}

/**
 * ### Props
 * - `type` - The type of alert to display
 * - `outlined` - Whether the alert should have a border. Defaults to true
 * - `rounded` - The border radius of the alert. Defaults to "md"
 * - `closable` - Whether the alert should have a close button
 * - `title` - The title of the alert
 * - `loading` - Controls the loading state of the close button
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    (
        {
            children,
            type,
            className,
            as,
            outlined,
            closable,
            title,
            titleProps,
            onClose,
            closeButtonProps,
            rounded,
            loading,
            ...props
        },
        ref
    ) => {
        const Comp = as || "div";

        return (
            <Comp ref={ref} className={alert({ type, className, outlined, rounded })} {...props}>
                {closable && (
                    <IconButton
                        color={type || "info"}
                        loading={loading}
                        {...closeButtonProps}
                        className={clsx("float-right", closeButtonProps?.className)}
                        onClick={(e) => {
                            e.stopPropagation();
                            closeButtonProps?.onClick?.(e);
                            onClose?.();
                        }}
                    >
                        <XIcon />
                    </IconButton>
                )}
                {title && (
                    <Title variant="h4" {...titleProps}>
                        {title}
                    </Title>
                )}
                {typeof children === "string" ? (
                    <p className={clsx("text-sm", closable && !title && "pt-2")}>{children}</p>
                ) : (
                    children
                )}
            </Comp>
        );
    }
);
