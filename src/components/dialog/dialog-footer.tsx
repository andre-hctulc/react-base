"use client";

import { tv } from "tailwind-variants";
import type { PropsOf, TVCProps } from "../../types";
import { Button } from "../input";
import { Toolbar } from "../containers";

const dialogFooter = tv({
    base: "px-6 pb-5 pt-4 box-border",
    variants: {
        variant: {
            actions: "flex justify-end",
            default: "",
            flex: "flex",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

interface DialogFooterProps extends TVCProps<typeof dialogFooter, "div"> {}

export const DialogFooter: React.FC<DialogFooterProps> = ({ children, className, variant, ...props }) => {
    return (
        <div className={dialogFooter({ className, variant })} {...props}>
            {children}
        </div>
    );
};

interface CancelConfirmProps {
    onCancel?: () => void;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
    buttonProps?: PropsOf<typeof Button>;
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
    children,
}) => {
    return (
        <Toolbar gap="md">
            {children}
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
                loading={loading}
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
                {confirmText || "Confirm"}
            </ConfirmButton>
        </Toolbar>
    );
};

interface CancelButtonProps extends PropsOf<typeof Button> {}

/**
 * A cancel button for dialogs.
 */
export const CancelButton: React.FC<CancelButtonProps> = (props) => {
    return (
        <Button variant="text" color="neutral" {...props}>
            {props.children || "Cancel"}
        </Button>
    );
};

interface ConfirmButtonProps extends PropsOf<typeof Button> {
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
