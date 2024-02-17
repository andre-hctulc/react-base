import LoadingDialog from "./LoadingDialog";
import React from "react";
import DialogTitle from "./DialogTitle";
import DialogContent from "./DialogContent";
import DialogHeader from "./DialogHeader";
import DialogFooter from "./DialogFooter";
import ErrorCircleOutlineIcon from "../../icons/collection/ErrorCircleOutline";
import BlankButton from "../../input/buttons/BlankButton";
import Button from "../../input/buttons/Button";
import Typography from "../../text/Typography";

interface DeleteDialogProps {
    open: boolean;
    onClose: () => void;
    title?: string;
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
                <Typography long textCenter secondary className="mb-2">
                    {props.children}
                </Typography>
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
                            // eslint-disable-next-line no-empty
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
