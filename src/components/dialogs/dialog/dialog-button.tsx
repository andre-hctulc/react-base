"use client";

import Toolbar from "@react-client/components/layout/containers/toolbar";
import clsx from "clsx";
import Button from "@react-client/components/input/buttons/button";

interface DialogButtonProps {
    valid?: boolean;
    onInvalidClick?: () => void;
    onClick?: () => void;
    children: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function DialogButton(props: DialogButtonProps) {
    return (
        <Toolbar padding="large" justify="end" className={clsx("mt-1", props.className)} style={props.style}>
            <Button
                size="medium"
                style={{ width: 140 }}
                variant="contained"
                onClick={e => {
                    e.stopPropagation();
                    if (props.valid !== false) props.onClick?.();
                    else props.onInvalidClick?.();
                }}
            >
                {props.children}
            </Button>
        </Toolbar>
    );
}
