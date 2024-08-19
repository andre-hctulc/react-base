"use client";

import React from "react";
import { mapChildren } from "../../util";
import type { StyleProps } from "../../types";
import clsx from "clsx";

interface ToggleIconButtonGroupProps extends StyleProps {
    value: string;
    children?: React.ReactNode;
    onChange?: (newValue: string) => void;
    noBorder?: boolean;
    noBorderRadius?: boolean;
}

/**
 * @css
 * @param props
 * @returns
 */
export default function ToggleIconButtonGroup(props: ToggleIconButtonGroupProps) {
    const children = mapChildren(props.children, (child) => {
        const buttonValue = child.props.value;
        const active = buttonValue === props.value;
        const onClick = (...args: any) => {
            child.props.onClick?.(...args);
            props.onChange?.(buttonValue);
        };

        return {
            props: { ...child.props, active, onClick, noBorder: true },
        };
    });

    return (
        <div
            style={props.style}
            className={clsx([
                "ToggleButtonGroup inline-flex flex-row self-start overflow-hidden flex-shrink-0",
                !props.noBorderRadius && "rounded",
                !props.noBorder && "border",
            ])}
        >
            {children}
        </div>
    );
}
