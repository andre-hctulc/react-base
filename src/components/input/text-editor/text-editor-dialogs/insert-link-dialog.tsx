import DialogButton from "@react-client/components/dialogs/dialog/DialogButton/DialogButton";
import { checkUrl } from "@client-util/strings";
import JSForm, { FormValidator, useFormObserver } from "@react-client/components/input/form/JSForm/JSForm";
import Dialog from "@react-client/components/dialogs/dialog/Dialog/Dialog";
import DialogTitle from "@react-client/components/dialogs/dialog/DialogTitle/DialogTitle";
import DialogContent from "@react-client/components/dialogs/dialog/DialogContent/DialogContent";
import Input from "@react-client/components/input/base/Input/Input";
import DialogHeader from "@react-client/components/dialogs/dialog/DialogHeader/DialogHeader";

type InsertLinkFormFata = { link: string; label: string };

const validate: FormValidator<InsertLinkFormFata> = { label: label => !!label, link: link => !!link && checkUrl(link) };

export default function InsertLinkDialog(props: { open: boolean; onCreate?: (data: InsertLinkFormFata) => void; onClose: () => void }) {
    const { formProps, valid, id } = useFormObserver();

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogHeader>
                <DialogTitle>Link einfügen</DialogTitle>
            </DialogHeader>
            <DialogContent>
                <JSForm
                    action={(_, data: InsertLinkFormFata) => {
                        props.onClose();
                        if (valid) props.onCreate?.(data);
                    }}
                    validate={validate}
                    {...formProps}
                >
                    <Input name="label" label="Bezeichnung" />
                    <Input name="link" label="Link" />
                </JSForm>
            </DialogContent>
            <DialogButton form={id}>Einfügen</DialogButton>
        </Dialog>
    );
}
