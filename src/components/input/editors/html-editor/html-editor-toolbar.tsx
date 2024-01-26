import React, { EventHandler } from "react";
import { getEditableSelection, getTextFormat, runCommand } from "./html-editor-util";
import clsx from "clsx";
import Divider from "@react-client/components/layout/Divider/Divider";
import LinkIcon from "@react-client/components/icons/collection/link";
import BoldIcon from "@react-client/components/icons/collection/bold";
import UnderlineIcon from "@react-client/components/icons/collection/underline";
import {  rgbStrToHex } from "@react-client/util";
import ItalicIcon from "@react-client/components/icons/collection/italic";
import AlignLeftIcon from "@react-client/components/icons/collection/align-left";
import AlignCenterIcon from "@react-client/components/icons/collection/align-center";
import AlignRightIcon from "@react-client/components/icons/collection/align-right";
import ListIcon from "@react-client/components/icons/collection/list";
import OrderdListIcon from "@react-client/components/icons/collection/orderd-list";
import ImageIcon from "@react-client/components/icons/collection/image";
import EditorTool from "../editor-tool";
import InsertLinkDialog from "../insert-link-dialog";
import InsertImageDialog from "../insert-image-dialog";
import FontSizeSelect from "@react-client/components/input/editors/font-size-select";
import ColorSelect from "@react-client/components/input/editors/color-select";
<<<<<<< HEAD
import Toolbar from "@react-client/components/layout/containers/toolbar";
import { PropsOf } from "@react-client/types";
=======
import Toolbar from "@react-client/components/layout/containers/Toolbar/Toolbar";
>>>>>>> 9141326d02a4250083ce3e61d74598fc4dcb439c

const HTMLEditorToolbar = React.forwardRef<HTMLElement, { children?: React.ReactNode }>((props, ref) => {
    const [linkDiaOpen, setLinkDiaOpen] = React.useState(false);
    const [imageDiaOpen, setImageDiaOpen] = React.useState(false);
    const [bezeichnung, setBezeichnung] = React.useState("");
    const [_range, setRange] = React.useState<Range | undefined>();
    const dividerProps: PropsOf<typeof Divider> = { className: "!mx-3", style: { height: 25 }, vertical: true };
    const classes = clsx("EditorToolbar space-x-1 overflow-x-auto bg-bg-paper flex-shrink-0" /* textEditor.small ? "py-0.5 px-1" : "p-1" */);

    function noteFocus(): boolean {
        const sel = getEditableSelection();

        if (!sel) {
            setBezeichnung("");
            setRange(undefined);
        } else {
            setBezeichnung(sel.toString());
            setRange(sel.getRangeAt(0));
        }

        return !!sel;
    }

    function execHandler(command: string) {
        return (event: React.MouseEvent<HTMLButtonElement>) => {
            runCommand(command, null, event);
        };
    }

    return (
        <Toolbar ref={ref} className={classes}>
            <InsertLinkDialog open={linkDiaOpen} onClose={() => setLinkDiaOpen(false)} />
            <InsertImageDialog open={imageDiaOpen} onClose={() => setImageDiaOpen(false)} />
            <EditorTool onClick={execHandler("bold")} tooltip="Fett">
                <BoldIcon />
            </EditorTool>
            <EditorTool onClick={execHandler("underline")} tooltip="Unterstrichen">
                <UnderlineIcon />
            </EditorTool>
            <EditorTool onClick={execHandler("italic")} tooltip="Kursiv">
                <ItalicIcon />
            </EditorTool>
            <FontSizeSelect
                className="!ml-2"
                onChange={fontSize => {
                    runCommand("fontSize", fontSize + "");
                }}
            />
            <Divider {...dividerProps} />
            <EditorTool onClick={execHandler("justifyLeft")} tooltip="Links anordnen">
                <AlignLeftIcon />
            </EditorTool>
            <EditorTool onClick={execHandler("justifyCenter")} tooltip="Zentrieren">
                <AlignCenterIcon />
            </EditorTool>
            <EditorTool onClick={execHandler("justifyRight")} tooltip="Rechts anordnen">
                <AlignRightIcon />
            </EditorTool>
            <Divider {...dividerProps} />
            <ColorSelect value={rgbStrToHex(getTextFormat("foreColor"))} tooltip="Farbe Vordergrund" onChange={(e, newColor) => runCommand("foreColor", newColor, e)} />
            <ColorSelect
                value={rgbStrToHex(getTextFormat("backColor"))}
                tooltip="Farbe Hintergrund"
                onChange={(e, newColor) => runCommand("backColor", newColor, e)}
                className="!ml-2"
            />
            <Divider {...dividerProps} />
            <EditorTool onClick={execHandler("insertUnorderedList")} tooltip="Ungeordnete Liste">
                <ListIcon />
            </EditorTool>
            <EditorTool onClick={execHandler("insertOrderedList")} tooltip="Geordnete Liste">
                <OrderdListIcon />
            </EditorTool>
            <Divider {...dividerProps} />
            <EditorTool
                tooltip="Link einfügen"
                onClick={e => {
                    e.preventDefault();
                    if (!noteFocus()) return;
                    setLinkDiaOpen(true);
                }}
            >
                <LinkIcon />
            </EditorTool>
            <EditorTool
                tooltip="Bild einfügen"
                onClick={e => {
                    e.preventDefault();
                    if (!noteFocus()) return;
                    //setUrl("");
                    //setBreite("100%");
                    setImageDiaOpen(true);
                }}
            >
                <ImageIcon />
            </EditorTool>

            {props.children}
        </Toolbar>
    );
});

HTMLEditorToolbar.displayName = "HTMLEditorToolbar";

export default HTMLEditorToolbar;
