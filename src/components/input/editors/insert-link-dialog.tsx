import Dialog from "@react-client/components/dialogs/dialog/Dialog/Dialog";
import React from "react";

interface InsertLinkDialogProps {
    className?: string;
    style?: React.CSSProperties;
    open: boolean;
    onClose?: () => void;
}

export default function InsertLinkDialog(props: InsertLinkDialogProps) {
    return (
        <Dialog className={props.className} style={props.style} open={props.open}>
            <>LINK DIALOG</>
        </Dialog>
    );
}
