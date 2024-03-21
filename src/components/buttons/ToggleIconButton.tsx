"use client";

import React from "react";
import IconButton from "./IconButton";
import { Size, StyleProps } from "../../types";
import Styled from "../shadow/Styled";
import { styleProps } from "../../util";

interface ToggleIconButtonProps extends StyleProps {
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
            {...styleProps(props)}
            size={props.size}
            ref={ref}
            variant={props.variant ?? "contained"}
            onClick={(e) => {
                props.onClick?.(e);
                if (!isControlled) setActive(!active);
            }}
            disabled={props.disabled}
        >
            <Styled color={active ? "info" : "accent"}>
                {active ? props.activeIcon || props.children : props.children}
            </Styled>
        </IconButton>
    );
});

ToggleIconButton.displayName = "ToggleIconButton";

export default ToggleIconButton;
