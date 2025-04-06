import { type FC, type ReactNode } from "react";
import { tv } from "tailwind-variants";
import type { PropsOf, TVCProps } from "../../types/index.js";
import { IconButton } from "../input/icon-button.js";
import { XIcon } from "../icons/x.js";
import { Title } from "../text/title.js";
import clsx from "clsx";
import { themeColor } from "../../util/style.js";
import { Toolbar } from "../containers/toolbar.js";

const alert = tv({
    base: "px-3 py-2",
    variants: {
        type: {
            error: "",
            success: "",
            warning: "",
            info: "",
        },
        outlined: {
            true: "border",
            false: "",
        },
        rounded: {
            sm: "rounded-sm",
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

export interface AlertProps extends Omit<TVCProps<typeof alert, "div">, "title"> {
    as?: any;
    closable?: boolean;
    onClose?: () => void;
    closeButtonProps?: PropsOf<typeof IconButton>;
    title?: ReactNode;
    titleProps?: PropsOf<typeof Title>;
    loading?: boolean;
    actions?: ReactNode;
    toolBarProps?: PropsOf<typeof Toolbar>;
    icon?: ReactNode;
}

/**
 * ### Props
 * - `type` - The type of alert to display
 * - `outlined` - Whether the alert should have a border. Defaults to true
 * - `rounded-sm` - The border radius of the alert. Defaults to "md"
 * - `closable` - Whether the alert should have a close button
 * - `title` - The title of the alert
 * - `loading` - Controls the loading state of the close button
 */
export const Alert: FC<AlertProps> = ({
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
    ref,
    actions,
    toolBarProps,
    icon,
    ...props
}) => {
    const Comp = as || "div";
    const { bgA, border, textC } = themeColor(type || "info");

    return (
        <Comp
            ref={ref}
            className={alert({ type, className: [bgA(30), border, textC, className], outlined, rounded })}
            {...props}
        >
            {(actions || closable) && (
                <Toolbar gap="xs" {...toolBarProps} className={clsx("float-right", toolBarProps?.className)}>
                    {actions}
                    <IconButton
                        color={type || "info"}
                        loading={loading}
                        {...closeButtonProps}
                        onClick={(e) => {
                            e.stopPropagation();
                            closeButtonProps?.onClick?.(e);
                            onClose?.();
                        }}
                    >
                        <XIcon />
                    </IconButton>
                </Toolbar>
            )}
            {(title || icon) && (
                <Title icon={icon} variant="h4" {...titleProps}>
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
};
