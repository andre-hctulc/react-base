import React from "react";
import { TextEditorIconButton } from "./text-editor-icon-button";
import { getEditableSelection, runCommand } from "./text-editor-util";
import EditorColorSelct from "../editors/color-select";
import InsertLinkDialog from "./text-editor-dialogs/insert-link-dialog";
import InsertImageDialog from "./text-editor-dialogs/insert-image-dialog";
import FontSizeSelect from "../editors/font-size-select";
import clsx from "clsx";
import Divider from "@react-client/components/layout/divider";
import LinkIcon from "@react-client/components/icons/collection/link";
import BoldIcon from "@react-client/components/icons/collection/bold";
import UnderlineIcon from "@react-client/components/icons/collection/underline";
import { PropsOf } from "@react-client/types";
import ItalicIcon from "@react-client/components/icons/collection/italic";
import AlignLeftIcon from "@react-client/components/icons/collection/align-left";
import AlignCenterIcon from "@react-client/components/icons/collection/align-center";
import AlignRightIcon from "@react-client/components/icons/collection/align-right";
import ListIcon from "@react-client/components/icons/collection/list";
import OrderdListIcon from "@react-client/components/icons/collection/orderd-list";
import ImageIcon from "@react-client/components/icons/collection/image";
import Stack from "@react-client/components/layout/containers/stack";

const TextEditorToolbar = React.forwardRef<HTMLDivElement, { children?: React.ReactNode }>((props, ref) => {
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

    return (
        <Stack direction="row" align="center" ref={ref} className={classes}>
            <InsertLinkDialog open={linkDiaOpen} onClose={() => setLinkDiaOpen(false)} />
            <InsertImageDialog open={imageDiaOpen} onClose={() => setImageDiaOpen(false)} />
            <TextEditorIconButton cmd="bold" tooltip="Fett">
                <BoldIcon />
            </TextEditorIconButton>
            <TextEditorIconButton cmd="underline" tooltip="Unterstrichen">
                <UnderlineIcon />
            </TextEditorIconButton>
            <TextEditorIconButton cmd="italic" tooltip="Kursiv">
                <ItalicIcon />
            </TextEditorIconButton>
            <FontSizeSelect className="!ml-2" onChange={fontSize => runCommand("fontSize", fontSize.toString())} />
            <Divider {...dividerProps} />
            <TextEditorIconButton cmd="justifyLeft" tooltip="Links anordnen">
                <AlignLeftIcon />
            </TextEditorIconButton>
            <TextEditorIconButton cmd="justifyCenter" tooltip="Zentrieren">
                <AlignCenterIcon />
            </TextEditorIconButton>
            <TextEditorIconButton cmd="justifyRight" tooltip="Rechts anordnen">
                <AlignRightIcon />
            </TextEditorIconButton>
            <Divider {...dividerProps} />
            <EditorColorSelct /* cmd="foreColor" */ tooltip="Farbe Vordergrund" />
            <EditorColorSelct className="!ml-2" /* cmd="backColor" */ tooltip="Farbe Hintergrund" />
            <Divider {...dividerProps} />
            <TextEditorIconButton cmd="insertUnorderedList" cssClass="hilfeAuflistung" tooltip="Ungeordnete Liste">
                <ListIcon />
            </TextEditorIconButton>
            <TextEditorIconButton cmd="insertOrderedList" tooltip="Geordnete Liste">
                <OrderdListIcon />
            </TextEditorIconButton>
            <Divider {...dividerProps} />
            <TextEditorIconButton
                tooltip="Link einfügen"
                onClick={e => {
                    e.preventDefault();
                    if (!noteFocus()) return;
                    setLinkDiaOpen(true);
                }}
            >
                <LinkIcon />
            </TextEditorIconButton>
            <TextEditorIconButton
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
            </TextEditorIconButton>

            {props.children}
        </Stack>
    );
});

TextEditorToolbar.displayName = "TextEditorToolbar";

export default TextEditorToolbar;
