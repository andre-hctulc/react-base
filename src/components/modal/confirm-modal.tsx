"use client";

import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    type ButtonProps,
    type ModalProps,
} from "flowbite-react";
import type { FC, ReactNode } from "react";
import { Toolbar } from "../containers";

export interface ConfirmModalProps extends ModalProps {
    confirmBtnText?: string;
    cancelBtnText?: string;
    title?: string;
    message: ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmBtnProps?: ButtonProps;
    cancelBtnProps?: ButtonProps;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
    confirmBtnText,
    cancelBtnText,
    title,
    message,
    onConfirm,
    onCancel,
    confirmBtnProps,
    cancelBtnProps,
    onClose,
    ...modalProps
}) => {
    return (
        <Modal
            size="md"
            onClose={() => {
                onClose?.();
                onCancel?.();
            }}
            {...modalProps}
        >
            {title && <ModalHeader>{title}</ModalHeader>}
            <ModalBody>{message}</ModalBody>
            <ModalFooter>
                <Toolbar grow justifyContent="end">
                    {cancelBtnText !== "" && (
                        <Button
                            color="gray"
                            outline
                            {...cancelBtnProps}
                            onClick={(e) => {
                                cancelBtnProps?.onClick?.(e);
                                if (!e.defaultPrevented) {
                                    onCancel?.();
                                }
                            }}
                        >
                            {cancelBtnText ?? "Cancel"}
                        </Button>
                    )}
                    <Button
                        color="red"
                        {...confirmBtnProps}
                        onClick={(e) => {
                            confirmBtnProps?.onClick?.(e);
                            if (!e.defaultPrevented) {
                                onConfirm?.();
                            }
                        }}
                    >
                        {confirmBtnText ?? "Ok"}
                    </Button>
                </Toolbar>
            </ModalFooter>
        </Modal>
    );
};
