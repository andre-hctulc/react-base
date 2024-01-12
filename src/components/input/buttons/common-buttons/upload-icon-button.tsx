"use client";

import React from "react";
import UploadIcon from "@react-client/components/icons/collection/upload";
import IconButton from "../icon-button";
import Tooltip from "@react-client/components/dialogs/popover/tooltip";

// BUG upload 2 mal gelieche dateie hintereinander -> onChange wird nicht aufgerufen

interface UploadIconButtonProps {
    children?: React.ReactNode;
    onChange?: (files: FileList) => void;
    multiple?: boolean;
    style?: React.CSSProperties;
    accept?: string;
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    outlined?: boolean;
}

const UploadIconButton = React.forwardRef<HTMLButtonElement, UploadIconButtonProps>((props, ref) => {
    const inpRef = React.useRef<HTMLInputElement>();

    return (
        <div className={props.className} style={props.style}>
            <IconButton ref={ref} variant="contained" disabled={props.loading || props.disabled} onClick={e => inpRef.current?.click()}>
                <UploadIcon />
            </IconButton>
            <input
                ref={inpRef as any}
                multiple={props.multiple}
                accept={props.accept}
                style={{ display: "none" }}
                onChange={e => props.onChange?.(e.target.files || new FileList())}
                type="file"
            />
        </div>
    );
});

UploadIconButton.displayName = "UploadIconButton";

export default UploadIconButton;
