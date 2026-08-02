"use client";

import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { ConfirmDialog, type ConfirmDialogProps } from "./confirm-dialog";

interface UseConfirmDialogOptions {
    baseDialogOptions?: Partial<ConfirmDialogProps>;
}

interface UseConfirmDialogResult {
    /**
     * @returns A promise that resolves to true if confirmed, false otherwise.
     */
    confirm: (dialogProps: Partial<ConfirmDialogProps>) => Promise<boolean>;
    /**
     * Indicates if any confirm dialog is currently active.
     */
    isActive: boolean;
    /**
     * The React nodes for the confirm dialogs.
     */
    confirmModals: ReactNode;
}

export function useConfirmDialog({
    baseDialogOptions,
}: UseConfirmDialogOptions = {}): UseConfirmDialogResult {
    const dialogs = useRef<Record<string, ConfirmDialogProps>>({});
    const [dialogsOpen, setDialogsOpen] = useState<Record<string, boolean>>({});

    const isActive = useMemo(() => Object.values(dialogsOpen).some(Boolean), [dialogsOpen]);

    const confirm = useCallback(
        (dialogProps: Partial<ConfirmDialogProps>) => {
            const id = crypto.randomUUID();

            return new Promise<boolean>((resolve) => {
                setDialogsOpen((prev) => ({ ...prev, [id]: true }));

                const close = () => {
                    setDialogsOpen((prev) => ({ ...prev, [id]: false }));
                    setTimeout(() => {
                        delete dialogs.current[id];
                    }, 300);
                };

                const handleConfirm = () => {
                    close();
                    baseDialogOptions?.onConfirm?.();
                    dialogProps.onConfirm?.();
                    resolve(true);
                };

                const handleCancel = () => {
                    close();
                    baseDialogOptions?.onCancel?.();
                    dialogProps.onCancel?.();
                    resolve(false);
                };

                dialogs.current[id] = {
                    message: "Are you sure?",
                    ...baseDialogOptions,
                    ...dialogProps,
                    onConfirm: handleConfirm,
                    onCancel: handleCancel,
                };
            });
        },
        [baseDialogOptions],
    );

    const confirmModals = (
        <>
            {Object.entries(dialogs.current).map(([id, props]) => (
                <ConfirmDialog key={id} {...props} open={dialogsOpen[id] ?? false} />
            ))}
        </>
    );

    return { confirm, isActive, confirmModals };
}
