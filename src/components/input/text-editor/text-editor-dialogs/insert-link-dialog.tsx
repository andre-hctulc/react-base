import DialogButton from "@react-client/components/dialogs/dialog/dialog-button";
import { checkUrl } from "@client-util/strings";
import Dialog from "@react-client/components/dialogs/dialog/dialog";
import DialogTitle from "@react-client/components/dialogs/dialog/dialog-title";
import DialogContent from "@react-client/components/dialogs/dialog/dialog-content";
import Input from "@react-client/components/input/base/input";
import JSForm, { FormValidator, useFormController } from "@react-client/components/input/form/js-form";
import DialogHeader from "@react-client/components/dialogs/dialog/dialog-header";

type InsertLinkFormFata = { link: string; label: string };

const validate: FormValidator<InsertLinkFormFata> = { label: label => !!label, link: link => !!link && checkUrl(link) };

export default function InsertLinkDialog(props: { open: boolean; onCreate?: (data: InsertLinkFormFata) => void; onClose: () => void }) {
    const { formProps, valid, id } = useFormController();

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
