"use client";

import React from "react";
import IconButton from "./IconButton";
import Styled from "../shadow/Styled";
import type { StyleProps } from "../../types";
import clsx from "clsx";

interface ToggleIconButtonProps extends StyleProps {
    children: React.ReactElement;
    activeIcon?: React.ReactElement;
    onClick?: (event: React.MouseEvent) => void;
    disabled?: boolean;
    /** controlled */
    active?: boolean;
    value?: string;
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
            className={clsx(props.className)}
            ref={ref}
            variant={props.variant ?? "contained"}
            onClick={(e) => {
                props.onClick?.(e);
                if (!isControlled) setActive(!active);
            }}
            disabled={props.disabled}
        >
            <Styled>{active ? props.activeIcon || props.children : props.children}</Styled>
        </IconButton>
    );
});

ToggleIconButton.displayName = "ToggleIconButton";

export default ToggleIconButton;
