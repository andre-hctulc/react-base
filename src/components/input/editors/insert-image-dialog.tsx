import Dialog from "@react-client/components/dialogs/dialog/dialog";
import React from "react";

interface InsertLinkDialogProps {
    className?: string;
    style?: React.CSSProperties;
    open: boolean;
    onClose?: () => void;
}

export default function InsertImageDialog(props: InsertLinkDialogProps) {
    return (
        <Dialog className={props.className} style={props.style} open={props.open}>
            <>IMAGE DIALOG</>
        </Dialog>
    );
}
