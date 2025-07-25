"use client";

import { useEffect, useState, type FC, type ReactElement, type Ref } from "react";
import type { PropsOf, StyleProps } from "../../types/index.js";
import type { InputLikeProps } from "./types.js";
import { IconButton } from "./icon-button.js";
import { HiddenInput } from "./hidden-input.js";

export interface ToggleIconButtonProps extends InputLikeProps<boolean>, StyleProps {
    children: ReactElement;
    color?: PropsOf<typeof IconButton>["color"];
    size?: PropsOf<typeof IconButton>["size"];
    ref?: Ref<HTMLButtonElement>;
}

export const ToggleIconButton: FC<ToggleIconButtonProps> = ({
    className,
    style,
    defaultValue,
    value,
    onChange,
    children,
    size,
    disabled,
    readOnly,
    required,
    color,
    name,
    id,
    ref,
}) => {
    const controlled = value !== undefined;
    const [active, setActive] = useState(value ?? defaultValue ?? false);

    useEffect(() => {
        if (controlled) {
            setActive(value);
        }
    }, [value]);

    return (
        <>
            {name && <HiddenInput id={id} value={active} name={name} required={required} />}
            <IconButton
                ref={ref}
                style={style}
                className={className}
                size={size}
                variant={active ? "filled" : "outlined"}
                color={color}
                disabled={disabled || readOnly}
                onClick={() => {
                    const newValue = !active;
                    if (!controlled) setActive(newValue);
                    onChange?.({ value: newValue });
                }}
            >
                {children}
            </IconButton>
        </>
    );
};
