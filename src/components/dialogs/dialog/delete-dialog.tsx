import LoadingDialog from "./loading-dialog";
import React from "react";
import DialogTitle from "./dialog-title";
import DialogContent from "./dialog-content";
import Button from "@react-client/components/input/buttons/button";
import ErrorCircleOutlineIcon from "@react-client/components/icons/collection/error-circle-outline";
import LongText from "@react-client/components/text/long-text";
import DialogFooter from "./dialog-footer";
import BlankButton from "@components/common-buttons/blank-button";
import DialogHeader from "./dialog-header";

interface DeleteDialogProps {
    title?: string;
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    deleteButtonText?: string;
    cancelButtonText?: string;
    onDelete?: () => void;
    onCancel?: () => void;
}

export default function DeleteDialog(props: DeleteDialogProps) {
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <LoadingDialog loading={isLoading} open={props.open} onClose={props.onClose}>
            <DialogHeader>
                <div className="flex items-center justify-center">
                    <ErrorCircleOutlineIcon className="text-text-secondary" size={80} />
                </div>
                <DialogTitle className="!flex-col mb-2">{props.title}</DialogTitle>
            </DialogHeader>
            <DialogContent>
                <LongText center secondary className="mb-2">
                    {props.children}
                </LongText>
            </DialogContent>
            <DialogFooter spacing="large" toolbar justify="center">
                <BlankButton
                    variant="outlined"
                    onClick={() => {
                        props.onCancel?.();
                        props.onClose();
                    }}
                >
                    {props.cancelButtonText || "Abbrechen"}
                </BlankButton>
                <Button
                    color="error"
                    variant="outlined"
                    onClick={async () => {
                        setIsLoading(true);
                        try {
                            await props.onDelete?.();
                        } catch (err) {}
                        setIsLoading(false);
                        props.onClose?.();
                    }}
                    disabled={isLoading}
                >
                    {props.deleteButtonText || "Löschen"}
                </Button>
            </DialogFooter>
        </LoadingDialog>
    );
}
