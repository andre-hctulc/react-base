"use client";

import type { FC } from "react";
import type { PropsOf } from "../../types/index.js";
import { Toolbar } from "../containers/toolbar.js";
import { Button } from "flowbite-react";
import { ButtonSpinner } from "../button/button-spinner.js";

interface CancelConfirmProps {
    className?: string;
    gap?: PropsOf<typeof Toolbar>["gap"];
    p?: PropsOf<typeof Toolbar>["p"];
    grow?: PropsOf<typeof Toolbar>["grow"];
    justifyContent?: PropsOf<typeof Toolbar>["justifyContent"];
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
    p,
    justifyContent,
    grow,
}) => {
    return (
        <Toolbar className={className} gap={gap} p={p} justifyContent={justifyContent} grow={grow}>
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
                {loading && <ButtonSpinner />}
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
        <Button color={danger ? "failure" : "default"} {...props}>
            {props.children || "Confirm"}
        </Button>
    );
};
