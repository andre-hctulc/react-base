"use client";

import type { FC } from "react";
import type { PropsOf } from "../../types/index.js";
import { Toolbar } from "../containers/toolbar.js";
import { Button, Spinner } from "flowbite-react";
import { ButtonIcon } from "../data-display/button-icon.js";

interface CancelConfirmProps {
    className?: string;
    gap?: PropsOf<typeof Toolbar>["gap"];
    padding?: PropsOf<typeof Toolbar>["p"];
    onCancel?: () => void;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
    buttonProps?: PropsOf<typeof Button<"button">>;
    form?: string;
    confirmButtonProps?: PropsOf<typeof ConfirmButton>;
    cancelButtonProps?: PropsOf<typeof CancelButton>;
    loading?: boolean;
    danger?: boolean;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    /**
     * @default true
     */
    showCancel?: boolean;
    children?: React.ReactNode;
}

/**
 * Cancel and confirm button for a dialog footer. Use  {@link DialogFooter} `variant="actions"` for the footer to align the buttons correctly.
 *
 * ### Props
 * - `form` - The form associated with the confirm button
 */
export const CancelConfirm: React.FC<CancelConfirmProps> = ({
    onCancel,
    onConfirm,
    confirmText,
    cancelText,
    buttonProps,
    form,
    loading,
    danger,
    size,
    showCancel,
    confirmButtonProps,
    cancelButtonProps,
    disabled,
    className,
    gap,
    padding,
}) => {
    return (
        <Toolbar className={className} gap={gap} p={padding}>
            {showCancel !== false && (
                <CancelButton
                    size={size}
                    disabled={loading}
                    {...buttonProps}
                    {...cancelButtonProps}
                    onClick={(e) => {
                        onCancel?.();
                        buttonProps?.onClick?.(e);
                        cancelButtonProps?.onClick?.(e);
                    }}
                >
                    {cancelText}
                </CancelButton>
            )}
            <ConfirmButton
                size={size}
                disabled={disabled}
                danger={danger}
                form={form}
                type={form ? "submit" : "button"}
                {...buttonProps}
                {...confirmButtonProps}
                onClick={(e) => {
                    onConfirm?.();
                    buttonProps?.onClick?.(e);
                    confirmButtonProps?.onClick?.(e);
                }}
            >
                {loading && (
                    <ButtonIcon>
                        <Spinner size="sm" light />
                    </ButtonIcon>
                )}
                {confirmText || "Confirm"}
            </ConfirmButton>
        </Toolbar>
    );
};

interface CancelButtonProps extends PropsOf<typeof Button<"button">> {}

/**
 * A cancel button for dialogs.
 */
export const CancelButton: FC<CancelButtonProps> = (props) => {
    return (
        <Button color="light" {...props}>
            {props.children || "Cancel"}
        </Button>
    );
};

interface ConfirmButtonProps extends PropsOf<typeof Button<"button">> {
    danger?: boolean;
}

/**
 * A confirm button for dialogs.
 */
export const ConfirmButton: React.FC<ConfirmButtonProps> = ({ danger, ...props }) => {
    return (
        <Button color={danger ? "error" : "primary"} {...props}>
            {props.children || "Confirm"}
        </Button>
    );
};
