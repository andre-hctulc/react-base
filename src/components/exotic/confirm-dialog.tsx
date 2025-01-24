"use client";

import { tv } from "tailwind-variants";
import type { PropsOf, TVCProps } from "../../types";
import { Dialog } from "../dialog/dialog";
import { DialogHeader } from "../dialog/dialog-header";
import { DialogBody } from "../dialog/dialog-body";
import { DialogFooter } from "../dialog/dialog-footer";
import React from "react";
import { CancelConfirm, type CancelButton, type ConfirmButton } from "./dialog-actions";

interface ConfirmOptions {
    /**
     * Additional props for the dialog.
     */
    dialogProps?: Omit<Partial<ConfirmDialogProps>, "danger">;
    /**
     * Passed to the confirm dialog.
     */
    danger?: boolean;
}

interface Confirmation {
    confirm: (message: React.ReactNode, confirmOptions: ConfirmOptions) => Promise<boolean>;
    /**
     * Must be rendered.
     */
    dialog: React.ReactNode;
}

export function useConfirmDialog(): Confirmation {
    const [open, setOpen] = React.useState(false);
    const [params, setParams] = React.useState<{ message: React.ReactNode; options: ConfirmOptions } | null>(
        null
    );
    const closeListener = React.useRef<(confirmed: boolean) => void>();
    const dialog = (
        <ConfirmDialog
            danger={params?.options.danger}
            {...params?.options.dialogProps}
            open={open}
            onConfirm={() => {
                closeListener.current?.(true);
                params?.options.dialogProps?.onConfirm?.();
            }}
            onCancel={() => {
                closeListener.current?.(false);
                params?.options.dialogProps?.onCancel?.();
            }}
        >
            {params?.message}
        </ConfirmDialog>
    );

    const confirm = React.useCallback<Confirmation["confirm"]>(async (message, options) => {
        setParams({ message, options });
        setOpen(true);

        return new Promise<boolean>((resolve) => {
            closeListener.current = (confirmed) => {
                setOpen(false);

                // remove params after timeout, otherwise the dialog out animation
                // will be performed with no params which means children and dialog props will be null
                // -> These changes are visible in the out animation. e.g. danger error button gets primary color and text disappears
                setTimeout(() => setParams(null), 300);

                closeListener.current = undefined;

                resolve(confirmed);
            };
        });
    }, []);

    return { dialog, confirm };
}

const confirmDialog = tv({});

interface ConfirmDialogProps extends TVCProps<typeof confirmDialog, typeof Dialog> {
    heading?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    danger?: boolean;
    cancelButtonText?: string;
    cancelButtonProps?: PropsOf<typeof CancelButton>;
    confirmButtonText?: string;
    confirmButtonProps?: PropsOf<typeof ConfirmButton>;
    /**
     * @default true
     */
    showCancel?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    heading,
    className,
    variant,
    children,
    onCancel,
    onConfirm,
    danger,
    cancelButtonText,
    confirmButtonText,
    cancelButtonProps,
    confirmButtonProps,
    showCancel,
    onClose,
    ...props
}) => {
    return (
        <Dialog
            className={confirmDialog({ className })}
            onClose={() => {
                onClose?.();
                // Fire onCancel if the dialog is closed without a confirm or cancel action
                onCancel?.();
            }}
            {...props}
        >
            {heading && <DialogHeader title={heading} />}
            <DialogBody>{children}</DialogBody>
            <DialogFooter variant="actions">
                <CancelConfirm
                    showCancel={showCancel}
                    cancelText={cancelButtonText}
                    confirmText={confirmButtonText}
                    danger={danger}
                    onCancel={onCancel}
                    onConfirm={onConfirm}
                    cancelButtonProps={cancelButtonProps}
                    confirmButtonProps={confirmButtonProps}
                />
            </DialogFooter>
        </Dialog>
    );
};
