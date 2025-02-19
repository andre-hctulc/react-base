"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { tv } from "tailwind-variants";
import { Dialog } from "../dialog/dialog";
import { DialogHeader } from "../dialog/dialog-header";
import { DialogBody } from "../dialog/dialog-body";
import { DialogFooter } from "../dialog/dialog-footer";
import React from "react";
import { CancelConfirm } from "./dialog-actions";
export function useConfirmDialog() {
    const [open, setOpen] = React.useState(false);
    const [params, setParams] = React.useState(null);
    const closeListener = React.useRef();
    const dialog = (_jsx(ConfirmDialog, { danger: params?.options.danger, ...params?.options.dialogProps, open: open, onConfirm: () => {
            closeListener.current?.(true);
            params?.options.dialogProps?.onConfirm?.();
        }, onCancel: () => {
            closeListener.current?.(false);
            params?.options.dialogProps?.onCancel?.();
        }, children: params?.message }));
    const confirm = React.useCallback(async (message, options) => {
        setParams({ message, options });
        setOpen(true);
        return new Promise((resolve) => {
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
export const ConfirmDialog = ({ heading, className, variant, children, onCancel, onConfirm, danger, cancelButtonText, confirmButtonText, cancelButtonProps, confirmButtonProps, showCancel, onClose, ...props }) => {
    return (_jsxs(Dialog, { className: confirmDialog({ className }), onClose: () => {
            onClose?.();
            // Fire onCancel if the dialog is closed without a confirm or cancel action
            onCancel?.();
        }, ...props, children: [heading && _jsx(DialogHeader, { title: heading }), _jsx(DialogBody, { children: children }), _jsx(DialogFooter, { variant: "actions", children: _jsx(CancelConfirm, { showCancel: showCancel, cancelText: cancelButtonText, confirmText: confirmButtonText, danger: danger, onCancel: onCancel, onConfirm: onConfirm, cancelButtonProps: cancelButtonProps, confirmButtonProps: confirmButtonProps }) })] }));
};
