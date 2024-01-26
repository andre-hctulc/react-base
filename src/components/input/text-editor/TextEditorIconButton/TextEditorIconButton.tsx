import clsx from "clsx";
import IconButton from "../../buttons/IconButton/IconButton";
import { getEditableSelection, getTextFormat, runCommand } from "../text-editor-util";
import Styled from "@react-client/components/others/Styled";

// TODO tooltip

export function TextEditorIconButton(props: {
    cmd?: string;
    cssClass?: string;
    children: React.ReactElement;
    tooltip: string;
    onClick?: (event: React.MouseEvent) => void;
}) {
    const active = props.cmd && getTextFormat(props.cmd) === "true";
    const classes = clsx(active && "bg-action-active");

    function onClick(e: React.MouseEvent) {
        props.onClick?.(e);

        if (!props.cmd) return;

        runCommand(props.cmd, null, e);

        if (props.cssClass) {
            const sel = getEditableSelection();
            if (!sel) return;

            const range = sel.getRangeAt(0);

            const ctl = range.commonAncestorContainer as HTMLElement;
            if (ctl.classList) ctl.classList.add(props.cssClass);
        }
    }

    return (
        <IconButton
            //disabled={!getEditableSelection()}
            size="small"
            onClick={onClick}
            className={classes}
        >
            <Styled size="small">{props.children}</Styled>
        </IconButton>
    );
}
