"use client";

import type { PropsOf, StyleProps } from "../../types";
import Button from "../buttons/Button";
import Toolbar from "../feedback/Toolbar";

interface DialogButtonProps extends StyleProps {
    disabled?: boolean;
    onInvalidClick?: () => void;
    onClick?: () => void;
    children: string;
    form?: string;
    type?: PropsOf<typeof Button>["type"];
}

export default function DialogButton(props: DialogButtonProps) {
    return (
        <Toolbar padding="large" justify="end" style={props.style} className={["mt-1", props.className]}>
            <Button
                form={props.form}
                size="medium"
                style={{ width: 140 }}
                variant="contained"
                onClick={(e) => {
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
