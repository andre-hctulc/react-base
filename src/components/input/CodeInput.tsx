"use client";

import clsx from "clsx";
import React from "react";
import Button from "./buttons/Button";
import Typography from "../text/Typography";

interface CodeInputProps {
    length: number;
    label?: string;
    onFinish?: (code: string) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
    className?: string;
    style?: React.CSSProperties;
    onResendClick?: () => void;
    resendTimeouts?: [number, number];
    disabled?: boolean;
}

export default function CodeInput(props: CodeInputProps) {
    const [values, setValues] = React.useState<(string | null)[]>([]);
    const [resendCount, setResendCount] = React.useState(0);
    const [resendDisabled, setResendDisabled] = React.useState(false);

    React.useEffect(() => {
        if (!resendCount) return;

        let timeoutLength: number;

        if (resendCount > 3) timeoutLength = props.resendTimeouts?.[1] || 40000; // 40 Sekunden
        else timeoutLength = props.resendTimeouts?.[0] || 15000; // 15 Sekunden

        setResendDisabled(true);

        const timeout = setTimeout(() => {
            setResendDisabled(false);
        }, timeoutLength);

        return () => {
            clearTimeout(timeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resendCount]);

    const inps = [];

    for (let i = 0; i < props.length; i++) {
        inps.push(
            <input
                onChange={e => {
                    values[i] = e.currentTarget.value;
                    setValues(values);

                    if (e.currentTarget.nextElementSibling) (e.currentTarget.nextElementSibling as HTMLInputElement).focus();
                    else {
                        e.currentTarget.blur();
                        for (const value of values) if (!value) return;
                        props.onFinish?.(values.join(""));
                    }
                }}
                onFocus={e => {
                    e.currentTarget.value = "";
                    values[i] = null;
                    if (props.onFocus) props.onFocus(e);
                }}
                key={i + ""}
                style={{ height: 40, width: 35, fontSize: 20, textAlign: "center" }}
                onKeyDown={e => {
                    if (e.key === "Backspace" && e.currentTarget.previousElementSibling && !e.currentTarget.value) {
                        (e.currentTarget.previousElementSibling as HTMLInputElement).focus();
                    }
                }}
            />
        );
    }

    return (
        <div className={clsx("inline-flex space-x-2", props.className)}>
            {props.label && (
                <Typography variant="body2" secondary className="mb-1">
                    {props.label}
                </Typography>
            )}
            <div className="flex space-x-2 justify-center">{inps}</div>
            <Button
                className="self-center"
                size="small"
                disabled={resendDisabled || props.disabled}
                onClick={() => {
                    props.onResendClick?.();
                    setResendCount(resendCount + 1);
                }}
            >
                Erneut senden
            </Button>
        </div>
    );
}
