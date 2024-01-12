import React from "react";
import DialogTitleIcon from "./dialog-title-icon";
import clsx from "clsx";
import DialogTitle from "./dialog-title";
import DialogHeader from "./dialog-header";
import Stack from "@react-client/components/layout/containers/stack";

export default function DialogInputHeader(props: {
    onChange?: (value: string) => void;
    defaultValue?: string;
    error?: boolean;
    icon?: React.ReactElement;
    title?: string;
    name?: string;
}) {
    const [inputRef, setInputRef] = React.useState<HTMLInputElement | null>(null);
    const [value, setValue] = React.useState(props.defaultValue);
    const inpClasses = clsx(
        "text-[40px] font-medium focus:outloine-none !focus:border-0  w-full p-0 border-0",
        props.error ? "border-error-light" : !value ? "border-inherit" : "border-transparent"
    );

    React.useEffect(() => {
        if (!inputRef) return;
        if (!inputRef.value) inputRef.value = props.defaultValue || "";
        inputRef.focus();
        inputRef.select();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputRef]);

    React.useEffect(() => {
        if (props.defaultValue) props.onChange?.(props.defaultValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col">
            {(props.icon || props.title) && (
                <DialogHeader>
                    {props.icon && <DialogTitleIcon>{props.icon}</DialogTitleIcon>}
                    <DialogTitle>{props.title}</DialogTitle>
                </DialogHeader>
            )}
            <Stack direction="row" align="center" className="px-3">
                <input
                    className={inpClasses}
                    ref={ref => setInputRef(ref)}
                    autoFocus
                    defaultValue={props.defaultValue}
                    onChange={e => {
                        setValue(e.target.value);
                        props.onChange?.(e.target.value);
                    }}
                />
            </Stack>
        </div>
    );
}
