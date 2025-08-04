"use client";

import type { PropsOf } from "../../types/index.js";
import { Dialog } from "../dialog/dialog.js";
import { CancelConfirm, type CancelButton, type ConfirmButton } from "./dialog-actions.js";
import { useCallback, useRef, useState, type ReactNode } from "react";
import { CardHeader } from "../containers/card-header.js";
import { CardBody } from "../containers/card-body.js";
import { CardFooter } from "../containers/card-footer.js";
import { Toolbar } from "../containers/toolbar.js";

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
    confirm: (message: ReactNode, confirmOptions: ConfirmOptions) => Promise<boolean>;
    /**
     * Must be rendered.
     */
    dialog: ReactNode;
}

export function useConfirmDialog(): Confirmation {
    const [open, setOpen] = useState(false);
    const [params, setParams] = useState<{ message: React.ReactNode; options: ConfirmOptions } | null>(null);
    const closeListener = useRef<(confirmed: boolean) => void>(undefined);

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

    const confirm = useCallback<Confirmation["confirm"]>(async (message, options) => {
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

interface ConfirmDialogProps extends PropsOf<typeof Dialog> {
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
            onClose={() => {
                onClose?.();
                // Fire onCancel if the dialog is closed without a confirm or cancel action
                onCancel?.();
            }}
            {...props}
        >
            {heading && <CardHeader title={heading} />}
            <CardBody>{children}</CardBody>
            <CardFooter variant="actions">
                <Toolbar>
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
                </Toolbar>
            </CardFooter>
        </Dialog>
    );
};
