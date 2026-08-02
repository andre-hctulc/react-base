"use client";

import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/cn/dialog.js";
import { Button, } from "@/components/cn/button.js";
import type { PropsOf } from "@/types/index.js";

export interface ConfirmDialogProps extends ComponentPropsWithoutRef<typeof Dialog> {
    confirmBtnText?: string;
    cancelBtnText?: string;
    title?: string;
    message: ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmBtnProps?: PropsOf<typeof Button>;
    cancelBtnProps?: PropsOf<typeof Button>;
}

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
    confirmBtnText,
    cancelBtnText,
    title,
    message,
    onConfirm,
    onCancel,
    confirmBtnProps,
    cancelBtnProps,
    onOpenChange,
    ...dialogProps
}) => {
    return (
        <Dialog
            onOpenChange={(open) => {
                onOpenChange?.(open);
                if (!open) onCancel?.();
            }}
            {...dialogProps}
        >
            <DialogContent className="sm:max-w-md">
                {title && (
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                )}
                <div className="py-2">{message}</div>
                <DialogFooter>
                    {cancelBtnText !== "" && (
                        <Button
                            variant="outline"
                            {...cancelBtnProps}
                            onClick={(e) => {
                                cancelBtnProps?.onClick?.(e);
                                if (!e.defaultPrevented) onCancel?.();
                            }}
                        >
                            {cancelBtnText ?? "Cancel"}
                        </Button>
                    )}
                    <Button
                        variant="destructive"
                        {...confirmBtnProps}
                        onClick={(e) => {
                            confirmBtnProps?.onClick?.(e);
                            if (!e.defaultPrevented) onConfirm?.();
                        }}
                    >
                        {confirmBtnText ?? "Ok"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
