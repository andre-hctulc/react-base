import Dialog from "@react-client/components/dialogs/dialog/dialog";
import DialogContent from "@react-client/components/dialogs/dialog/dialog-content";
import DialogFooter from "@react-client/components/dialogs/dialog/dialog-footer";
import DialogHeader from "@react-client/components/dialogs/dialog/dialog-header";
import DialogTitle from "@react-client/components/dialogs/dialog/dialog-title";
import Input from "@react-client/components/input/base/input";
import Button from "@react-client/components/input/buttons/button";
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
