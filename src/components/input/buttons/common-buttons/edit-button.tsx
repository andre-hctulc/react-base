import React from "react";
import Button from "../button";
import EditIcon from "@react-client/components/icons/collection/edit-icon";
import { PropsOf } from "@react-client/util";

interface EditButtonProps {
    className?: string;
    style?: React.CSSProperties;
    noIcon?: boolean;
    onClick?: React.MouseEventHandler;
    variant?: PropsOf<typeof Button>["variant"];
    active?: boolean;
    activeText?: string;
}

export default function EditButton(props: EditButtonProps) {
    return (
        <Button variant={props.variant} style={props.style} className={props.className} onClick={props.onClick} endIcon={props.noIcon ? undefined : <EditIcon />}>
            {props.active ? props.activeText || "Fertig" : "Bearbeiten"}
        </Button>
    );
}
