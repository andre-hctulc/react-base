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
    confirmIcon?: React.ReactNode;
}

/**
 * A footer for dialogs that contains a cancel and confirm button.
 */
export const CancelConfirm: React.FC<CancelConfirmProps> = ({
    onCancel,
    onConfirm,
    confirmText,
    cancelText: abortText,
    buttonProps,
    form,
    ...props
}) => {
    return (
        <>
            <CancelButton
                onClick={(e) => {
                    onCancel?.();
                    buttonProps?.onClick?.(e);
                }}
            >
                {abortText}
            </CancelButton>
            <Button
                onClick={(e) => {
                    onConfirm?.();
                    buttonProps?.onClick?.(e);
                }}
                variant="filled"
                color="primary"
                form={form}
                type={form ? "submit" : "button"}
                icon={props.confirmIcon}
                {...buttonProps}
            >
                {confirmText || "Confirm"}
            </Button>
        </>
    );
};

/**
 * A cancel button for dialogs.
 */
export const CancelButton: React.FC<PropsOf<typeof Button>> = (props) => {
    return (
        <Button variant="outlined" color="neutral" {...props}>
            {props.children || "Cancel"}
        </Button>
    );
};
