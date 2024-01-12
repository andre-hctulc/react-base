import type { PropsOf } from "@react-client/util";
import React from "react";
import ButtonSpinner from "../button-spinner";
import Button from "../button";
import UploadIcon from "@react-client/components/icons/collection/upload";

// BUG upload 2 mal gleiche datei hintereinander -> onChange wird nicht aufgerufen

export default function UploadButton(props: {
    slotProps?: { button?: PropsOf<typeof Button>; input?: PropsOf<"input"> };
    children?: React.ReactNode;
    onChange?: (files: FileList) => void;
    multiple?: boolean;
    style?: React.CSSProperties;
    accept?: string;
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    variant?: "text" | "outlined" | "contained";
}) {
    const inpRef = React.useRef<HTMLInputElement>();
    const inpProps = props.slotProps?.input;
    const buttonProps = props.slotProps?.button;

    return (
        <Button
            startIcon={<UploadIcon />}
            size={props.size || "small"}
            variant={props.variant}
            style={props.style}
            onClick={e => {
                buttonProps?.onClick?.(e);
                inpRef.current?.click();
            }}
            endIcon={props.loading && <ButtonSpinner />}
            disabled={props.loading || props.disabled}
            className={props.className}
        >
            <input
                ref={inpRef as any}
                multiple={props.multiple}
                accept={props.accept}
                {...inpProps}
                style={{ display: "none", ...inpProps?.style }}
                onChange={e => {
                    inpProps?.onChange?.(e);
                    props.onChange?.(e.target.files || new FileList());
                }}
                type="file"
            />
            {props.children || "Hochladen"}
        </Button>
    );
}
