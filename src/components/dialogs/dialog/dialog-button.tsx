"use client";

import Toolbar from "@react-client/components/layout/containers/toolbar";
import clsx from "clsx";
import Button from "@react-client/components/input/buttons/button";
import { PropsOf } from "@react-client/util";

interface DialogButtonProps {
    disabled?: boolean;
    onInvalidClick?: () => void;
    onClick?: () => void;
    children: string;
    className?: string;
    style?: React.CSSProperties;
    form?: string;
<<<<<<< HEAD
    type?: PropsOf<typeof Button>["type"];
=======
>>>>>>> abd05394c9687a6f2887a9309c5cf1c2d979c911
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
<<<<<<< HEAD
                type={props.type}
=======
>>>>>>> abd05394c9687a6f2887a9309c5cf1c2d979c911
            >
                {props.children}
            </Button>
        </Toolbar>
    );
}
