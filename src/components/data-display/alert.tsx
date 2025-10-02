import { type ReactNode } from "react";
import { tv } from "tailwind-variants";
import type { ELEMENT, PropsOf, RichAsProps, WithTVProps } from "../../types/index.js";
import { IconButton } from "../input/icon-button.js";
import { XIcon } from "../icons/phosphor/x.js";
import { Title } from "../text/title.js";
import clsx from "clsx";
import { themeColor } from "../../util/style.js";
import { Toolbar } from "../containers/toolbar.js";
import { Icon } from "../icons/icon.js";
import { InfoCircleIcon } from "../icons/phosphor/info-circle.js";
import { CheckCircleIcon } from "../icons/phosphor/check-circle.js";
import { WarningOctagonIcon } from "../icons/phosphor/warning-octagon.js";
import { QuestionCircleIcon } from "../icons/phosphor/question-circle.js";

const alert = tv({
    base: "px-3 py-2",
    variants: {
        severity: {
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
        shadow: {
            sm: "shadow-sm",
            md: "shadow-md",
            true: "shadow",
            lg: "shadow-lg",
            xl: "shadow-xl",
            none: "",
        },
        textColor: {
            none: "",
            contrast: "",
            t2: "text-t2",
            t3: "text-t3",
        },
    },
    defaultVariants: {
        severity: "info",
        outlined: true,
        rounded: "md",
        textColor: "contrast",
    },
});

type AlertProps<T extends ELEMENT = "div"> = WithTVProps<
    Omit<RichAsProps<T>, "title"> & {
        closable?: boolean;
        onClose?: () => void;
        closeButtonProps?: PropsOf<typeof IconButton>;
        title?: ReactNode;
        titleProps?: PropsOf<typeof Title>;
        loading?: boolean;
        actions?: ReactNode;
        toolBarProps?: PropsOf<typeof Toolbar>;
        icon?: ReactNode;
        defaultIcon?: boolean;
    },
    typeof alert
>;

export const getDefaultAlertIcon = (severity: AlertProps["severity"]) => {
    if (severity === "info") return <InfoCircleIcon />;
    else if (severity === "success") return <CheckCircleIcon />;
    else if (severity === "error") return <WarningOctagonIcon />;
    else if (severity === "warning") return <QuestionCircleIcon />;
    return <QuestionCircleIcon />;
};

/**
 * ### Props
 * - `type` - The type of alert to display
 * - `outlined` - Whether the alert should have a border. Defaults to true
 * - `rounded-sm` - The border radius of the alert. Defaults to "md"
 * - `closable` - Whether the alert should have a close button
 * - `title` - The title of the alert
 * - `loading` - Controls the loading state of the close button
 */
export const Alert = <T extends ELEMENT = "div">({
    children,
    severity = "info",
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
    defaultIcon,
    textColor,
    shadow,
    ...props
}: AlertProps<T>) => {
    const Comp: any = as || "div";
    const { bgA, border, textC } = themeColor(severity);
    const hasToolbar = !!actions || !!closable;
    const ic = icon || (defaultIcon ? getDefaultAlertIcon(severity) : null);

    return (
        <Comp
            ref={ref}
            className={alert({
                severity,
                className: [bgA(30), border, !textColor && textC, className],
                textColor,
                outlined,
                rounded,
                shadow,
            })}
            {...props}
        >
            {hasToolbar && (
                <Toolbar gap="xs" {...toolBarProps} className={clsx("float-right", toolBarProps?.className)}>
                    {ic && <Icon size="md">{ic}</Icon>}
                    {actions}
                    <IconButton
                        color={severity}
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
            {(title || ic) && (
                <Title
                    iconProps={{ color: severity, size: "md" }}
                    icon={!hasToolbar && ic}
                    variant="h4"
                    mb="xs"
                    {...titleProps}
                >
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
