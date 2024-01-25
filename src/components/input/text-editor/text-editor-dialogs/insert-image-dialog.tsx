import Dialog from "@react-client/components/dialogs/dialog/Dialog/Dialog";
import DialogContent from "@react-client/components/dialogs/dialog/DialogContent/DialogContent";
import DialogFooter from "@react-client/components/dialogs/dialog/DialogFooter/DialogFooter";
import DialogHeader from "@react-client/components/dialogs/dialog/DialogHeader/DialogHeader";
import DialogTitle from "@react-client/components/dialogs/dialog/DialogTitle/DialogTitle";
import Input from "@react-client/components/input/base/Input/Input";
import Button from "@react-client/components/input/buttons/Button/Button";
import { getSize } from "@react-client/util";

export default function InsertImageDialog(props: { open: boolean; onClose: () => void }) {
    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogHeader>
                <DialogTitle>Bild einfügen</DialogTitle>
            </DialogHeader>
            <DialogContent>
                <Input
                    label="URL"
                    /* value={url} */
                    type="url"
                    /* onChange={e => setUrl(e.target.value)} */
                    style={{ width: "500px", marginTop: "8px" }}
                />
                <Input
                    label="Größe"
                    value={getSize}
                    type="text"
                    /* onChange={e => setSize(e.target.value)} */
                    style={{ width: "100px", marginTop: "8px" }}
                />
            </DialogContent>
            <DialogFooter>
                <Button
                    onClick={e => {
                        /* let bild: HTMLImageElement;

                        if (!range) return;

                        setShowInsertImageDialog(false);

                        bild = document.createElement("img");
                        bild.src = url;
                        bild.style.width = size;

                        range.insertNode(bild); */
                    }}
                >
                    Einfügen
                </Button>
                <Button /*  onClick={() => setShowInsertImageDialog(false)} */>Abbrechen</Button>
            </DialogFooter>
        </Dialog>
    );
}
