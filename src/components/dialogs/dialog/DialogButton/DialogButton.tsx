"use client";

import Toolbar from "@react-client/components/layout/containers/Toolbar/Toolbar";
import clsx from "clsx";
import Button from "@react-client/components/input/buttons/Button/Button";
import { PropsOf } from "@react-client/types";

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
