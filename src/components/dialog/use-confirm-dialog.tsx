"use client";

import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { ConfirmDialog, type ConfirmDialogProps } from "./confirm-dialog";
import { hexId } from "@dre44/util/random";

interface UseConfirmDialogOptions {
    baseDialogOptions?: Partial<ConfirmDialogProps>;
}

interface ConfirmOptions {}

interface UseConfirmDialogResult {
    /**
     * @returns A promise that resolves to true if confirmed, false otherwise.
     */
    confirm: (modalProps: Partial<ConfirmDialogProps>, options?: ConfirmOptions) => Promise<boolean>;
    /**
     * Indicates if any confirm modal is currently active.
     */
    isActive: boolean;
    /**
     * The React nodes for the confirm modals.
     */
    confirmModals: ReactNode;
}

export function useConfirmDialog({ baseDialogOptions: baseModalProps }: UseConfirmDialogOptions = {}): UseConfirmDialogResult {
    const modals = useRef<Record<string, ConfirmDialogProps>>({});
    const [modalsOpen, setModalsOpen] = useState<Record<string, boolean>>({});
    const isActive = useMemo(() => {
        return Object.values(modalsOpen).some((open) => open);
    }, [modalsOpen]);

    const confirm = useCallback(
        (modalProps: Partial<ConfirmDialogProps>, options?: ConfirmOptions) => {
            const confirmationId = hexId(4);

            const promise = new Promise<boolean>((resolve) => {
                setModalsOpen((prev) => ({ ...prev, [confirmationId]: true }));

                const closeModal = () => {
                    setModalsOpen((prev) => ({ ...prev, [confirmationId]: false }));
                    setTimeout(() => {
                        delete modals.current[confirmationId];
                    }, 300);
                };

                const handleConfirm = () => {
                    closeModal();
                    baseModalProps?.onConfirm?.();
                    modalProps.onConfirm?.();
                    resolve(true);
                };

                const handleCancel = () => {
                    closeModal();
                    baseModalProps?.onCancel?.();
                    modalProps.onCancel?.();
                    resolve(false);
                };

                const handleClose = () => {
                    closeModal();
                    baseModalProps?.onClose?.();
                    modalProps.onClose?.();
                    resolve(false);
                };

                const mergedModalProps: ConfirmDialogProps = {
                    message: "Are you sure?",
                    show: true,
                    ...baseModalProps,
                    ...modalProps,
                    onConfirm: handleConfirm,
                    onCancel: handleCancel,
                    onClose: handleClose,
                };

                modals.current[confirmationId] = mergedModalProps;
            });

            return promise;
        },
        [baseModalProps, modalsOpen],
    );

    const confirmModals = (
        <>
            {Object.entries(modals.current).map(([confirmationId, modalProps]) => {
                const show = modalsOpen[confirmationId] ?? false;
                return <ConfirmDialog key={confirmationId} {...modalProps} show={show} />;
            })}
        </>
    );

    return {
        confirm,
        isActive,
        confirmModals,
    };
}
