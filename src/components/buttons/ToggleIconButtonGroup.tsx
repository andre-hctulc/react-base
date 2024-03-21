"use client";

import React from "react";
import { mapChildren, styleProps } from "../../util";
import { Size, StyleProps } from "../../types";

interface ToggleIconButtonGroupProps extends StyleProps {
    value: string;
    children?: React.ReactNode;
    onChange?: (newValue: string) => void;
    noBorder?: boolean;
    size?: Size;
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
            props: { ...child.props, active, size: child.props.size ?? props.size, onClick, noBorder: true },
        };
    });

    return (
        <div
            {...styleProps(
                {
                    className: [
                        "ToggleButtonGroup inline-flex flex-row self-start overflow-hidden flex-shrink-0",
                        !props.noBorderRadius && "rounded",
                        !props.noBorder && "border",
                    ],
                },
                props
            )}
        >
            {children}
        </div>
    );
}
