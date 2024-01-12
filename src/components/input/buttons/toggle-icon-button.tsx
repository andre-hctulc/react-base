// * SSR

import React from "react";
import IconButton from "./icon-button";
import clsx from "clsx";

interface ToggleIconButtonProps {
    className?: string;
    style?: React.CSSProperties;
    value: boolean;
    icon: (active: boolean) => React.ReactElement;
    onClick?: (event: React.MouseEvent) => void;
    disabled?: boolean;
}

const ToggleIconButton = React.forwardRef<HTMLButtonElement, ToggleIconButtonProps>((props, ref) => {
    const isActive = props.value;
    const classes = clsx("", isActive ? "bg-action-disabled" : "bg-action-selected", props.className);

    return (
        <IconButton ref={ref} variant="contained" className={classes} style={props.style} onClick={props.onClick} disabled={props.disabled}>
            {props.icon(isActive)}
        </IconButton>
    );
});

ToggleIconButton.displayName = "ToggleIconButton";

export default ToggleIconButton;
