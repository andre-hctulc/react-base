"use client";

import React from "react";
import IconButton from "./IconButton";
import { Size } from "../../../types";
import Styled from "../../others/Styled";

interface ToggleIconButtonProps {
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactElement;
    activeIcon?: React.ReactElement;
    onClick?: (event: React.MouseEvent) => void;
    disabled?: boolean;
    /** controlled */
    active?: boolean;
    value?: string;
    size?: Size;
    variant?: "contained" | "outlined";
}

const ToggleIconButton = React.forwardRef<HTMLButtonElement, ToggleIconButtonProps>((props, ref) => {
    const isControlled = props.active !== undefined;
    const [active, setActive] = React.useState(props.active ?? false);

    React.useEffect(() => {
        if (isControlled) setActive(props.active || false);
    }, [props.active, isControlled]);

    return (
        <IconButton
            size={props.size}
            ref={ref}
            variant={props.variant ?? "contained"}
            style={props.style}
            onClick={e => {
                props.onClick?.(e);
                if (!isControlled) setActive(!active);
            }}
            disabled={props.disabled}
            className={props.className}
        >
            <Styled color={active ? "info" : "accent"}>{active ? props.activeIcon || props.children : props.children}</Styled>
        </IconButton>
    );
});

ToggleIconButton.displayName = "ToggleIconButton";

export default ToggleIconButton;
