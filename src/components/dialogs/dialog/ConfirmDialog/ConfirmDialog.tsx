"use client";

import React from "react";
import Dialog from "../Dialog/Dialog";
import DialogTitle from "../DialogTitle/DialogTitle";
import DialogContent from "../DialogContent/DialogContent";
import Button from "@react-client/components/input/buttons/Button/Button";
import DialogFooter from "../DialogFooter/DialogFooter";
import Typography from "@react-client/components/text/Typography/Typography";
import DialogHeader from "../DialogHeader/DialogHeader";

interface ConfirmDialogProps {
    open: boolean;
    children: string;
    title?: string;
    onFinish?: (result: true | false | undefined) => void;
    options?: { yes?: string; no?: string; cancel?: string };
    cancelable?: boolean;
}

export default function ConfirmDialog(props: ConfirmDialogProps) {
    return (
        <Dialog open={props.open}>
            {props.title && (
                <DialogHeader>
                    <DialogTitle>{props.title}</DialogTitle>
                </DialogHeader>
            )}
            <DialogContent>
                <Typography>{props.children}</Typography>
            </DialogContent>
            <DialogFooter>
                <Button onClick={() => props.onFinish?.(true)}>{props.options?.yes || "Ja"}</Button>
                <Button onClick={() => props.onFinish?.(false)}>{props.options?.no || "Nein"}</Button>
                {props.cancelable !== false && <Button onClick={() => props.onFinish?.(undefined)}>{props.options?.no || "Abbrechen"}</Button>}
            </DialogFooter>
        </Dialog>
    );
}
