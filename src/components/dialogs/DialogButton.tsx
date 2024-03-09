"use client";

import clsx from "clsx";
import type { PropsOf } from "../../types";
import Button from "../input/buttons/Button";
import Toolbar from "../feedback/Toolbar";

interface DialogButtonProps {
    disabled?: boolean;
    onInvalidClick?: () => void;
    onClick?: () => void;
    children: string;
    className?: string;
    style?: React.CSSProperties;
    form?: string;
    type?: PropsOf<typeof Button>["type"];
}

export default function DialogButton(props: DialogButtonProps) {
    return (
        <Toolbar padding="large" justify="end" className={clsx("mt-1", props.className)} style={props.style}>
            <Button
                form={props.form}
                size="medium"
                style={{ width: 140 }}
                variant="contained"
                onClick={e => {
                    e.stopPropagation();
                }}
                disabled={props.disabled}
                type={props.type}
            >
                {props.children}
            </Button>
        </Toolbar>
    );
}
