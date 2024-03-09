/* eslint-disable react-refresh/only-export-components */

import type { DemoDef, DemoProps } from "src/types";

// demo_start

import React from "react";
import Dialog from "@react-base/src/components/dialogs/Dialog";
import { Button, DialogHeader, DialogTitleIcon, DialogTitle, DialogContent, Alert, DialogFooter } from "@react-base/src/components";
import DocumentOutlineIcon from "@react-base/src/components/icons/collection/DocumentOutline";

function DialogDemo({ demoProps }: DemoProps) {
    const [open, setOpen] = React.useState(false);

    function handleClose() {
        setOpen(false);
    }

    return (
        <div>
            <Button className="m-5" variant="contained" onClick={() => setOpen(true)}>
                Dialog öffnen
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogHeader>
                    <DialogTitleIcon>
                        <DocumentOutlineIcon />
                    </DialogTitleIcon>
                    <DialogTitle>Info</DialogTitle>
                </DialogHeader>
                <DialogContent>
                    <Alert severity="info">This is a Dialog</Alert>
                </DialogContent>
                <DialogFooter toolbar justify="end">
                    <Button color="info" onClick={handleClose}>
                        Understand 🫡
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

// demo_end

const def: DemoDef = {
    name: "default",
    render: DialogDemo,
    demoProps: [],
};

export default def;
