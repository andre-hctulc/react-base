"use client";

import { tv } from "tailwind-variants";
import type { PropsOf, TVCProps } from "../../types";
import { Button } from "../input";

const dialogFooter = tv({
    base: "px-6 pb-5 box-border",
    variants: {
        variant: {
            actions: "flex gap-4 justify-end",
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
    ok?: boolean;
    confirmButtonProps?: PropsOf<typeof ConfirmButton>;
    cancelButtonProps?: PropsOf<typeof CancelButton>;
    loading?: boolean;
    danger?: boolean;
    size?: "sm" | "md" | "lg";
    /**
     * @default true
     */
    showCancel?: boolean;
}

/**
 * Cancel and confirm button for a dialog footer. Use variant `actions` for the footer to align the buttons correctly.
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
}) => {
    return (
        <>
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
        </>
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
