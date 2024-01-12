import DialogButton from "@react-client/components/dialogs/dialog/dialog-button";
import { checkName } from "@util/validate";
import { checkUrl } from "@client-util/strings";
import Dialog from "@react-client/components/dialogs/dialog/dialog";
import DialogTitle from "@react-client/components/dialogs/dialog/dialog-title";
import DialogContent from "@react-client/components/dialogs/dialog/dialog-content";
import Input from "@react-client/components/input/base/input";
import JSForm, { FormValidator, useFormData } from "@react-client/components/input/form/js-form";
import DialogHeader from "@react-client/components/dialogs/dialog/dialog-header";

type InsertLinkFormFata = { link: string; label: string };

const validate: FormValidator<InsertLinkFormFata> = { label: label => checkName(label), link: link => (link && checkUrl(link) ? true : "Ungültiger Link") };

export default function InsertLinkDialog(props: { open: boolean; onCreate?: (data: InsertLinkFormFata) => void; onClose: () => void }) {
    const { formProps, ok, okData, hint } = useFormData<InsertLinkFormFata>();

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogHeader>
                <DialogTitle>Link einfügen</DialogTitle>
            </DialogHeader>
            <DialogContent>
                <JSForm validate={validate} {...formProps}>
                    <Input name="label" label="Bezeichnung" />
                    <Input name="link" label="Link" />
                </JSForm>
            </DialogContent>
            <DialogButton
                valid={ok}
                onInvalidClick={() => hint()}
                onClick={() => {
                    props.onClose();
                    if (ok) props.onCreate?.(okData);
                }}
            >
                Einfügen
            </DialogButton>
        </Dialog>
    );
}
