"use client";

import React from "react";
import IconButton from "../icon-button";
import CopyIcon from "@react-client/components/icons/collection/copy";
import { useAlerts } from "@react-client/contexts/alert-context";
import { Size } from "@react-client/types";

interface CopyIconButtonProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent, copyToClipboard: (text: string) => void) => void;
    text?: string;
    size?: Size;
    disabled?: boolean;
    /**
     * Nutze `""`, um keine success message anzuzeigen.
     * @default "Kopiert"
     * */
    successMessage?: string;
    iconSize?: number;
}

export default function CopyIconButton(props: CopyIconButtonProps) {
    const { success } = useAlerts();

    function copyToClipboard(text: string) {
        if (typeof text !== "string") return;

        navigator.clipboard.writeText(text).then(() => {
            if (props.successMessage !== "") success(props.successMessage || "Kopiert");
        });
    }

    return (
        <IconButton
            disabled={props.disabled}
            className={props.className}
            style={props.style}
            size={props.size}
            onClick={e => {
                if (props.text) copyToClipboard(props.text);
                props.onClick?.(e, copyToClipboard);
            }}
            iconSize={props.iconSize}
        >
            <CopyIcon />
        </IconButton>
    );
}
