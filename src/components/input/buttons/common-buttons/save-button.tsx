// * SSR

import React from "react";
import Button from "../button";
import ButtonSpinner from "../button-spinner";
import { Size } from "@react-client/types";

interface SaveButtonProps {
    loading?: boolean;
    children?: string;
    size?: Size;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const SaveButton = React.forwardRef<HTMLButtonElement, SaveButtonProps>((props, ref) => {
    return (
        <Button
            onClick={props.onClick}
            disabled={props.loading || props.disabled}
            style={props.style}
            className={props.className}
            ref={ref}
            size={props.size}
            endIcon={props.loading && <ButtonSpinner />}
            variant="text"
            color="info"
        >
            {props.children || "Speichern"}
        </Button>
    );
});

SaveButton.displayName = "SaveButton";

export default SaveButton;
