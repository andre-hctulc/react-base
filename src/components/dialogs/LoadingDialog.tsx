import React from "react";
import Dialog, { DialogDim, DialogProps } from "./Dialog";
import LoadingOverlay from "../feedback/LoadingOverlay";
import { StyleProps } from "../../types";

interface LoadingDialogProps extends StyleProps {
    loading?: boolean;
    open: boolean;
    onClose?: React.MouseEventHandler<HTMLDivElement>;
    children?: React.ReactNode;
    size?: DialogDim;
    minSize?: DialogDim;
    maxSize?: DialogDim;
    slotProps?: DialogProps["slotProps"];
    /** Wird statt den _children_ während des Ladens gerendert (`loading=true`) */
    staticLoading?: React.ReactNode;
}

const LoadingDialog = React.forwardRef<HTMLDivElement, LoadingDialogProps>((props, ref) => {
    const onClose = (e: any) => {
        if (!props.loading && props.onClose) props.onClose(e);
    };

    return (
        <Dialog
            slotProps={props.slotProps}
            className={props.className}
            style={props.style}
            minSize={props.minSize}
            maxSize={props.maxSize}
            size={props.size}
            onClose={onClose}
            ref={ref}
            open={props.open}
        >
            <LoadingOverlay open={!!props.loading} />
            {props.loading && props.staticLoading ? props.staticLoading : props.children}
        </Dialog>
    );
});

LoadingDialog.displayName = "LoadingDialog";

export default LoadingDialog;
