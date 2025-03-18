"use client";

import type { StyleProps } from "../../types/index.js";
import { Droppable } from "./droppable.js";
import React from "react";
import { List } from "../containers/list.js";
import clsx from "clsx";
import type { InputLikeProps } from "./types.js";

interface UploadZoneProps extends StyleProps, InputLikeProps<File[]> {
    children?: React.ReactNode;
    secondaryText?: string;
    text?: string;
    multiple?: boolean;
    icon?: React.ReactNode;
    renderFiles?: ((files: File[]) => React.ReactNode) | "menu";
    removeIcon?: React.ReactNode;
    accept?: string;
}

const fileId = (file: File) => file.webkitRelativePath || file.name;

/**
 * ### Props
 * `required` - **Not supported** due to use of hidden input
 */
export const UploadZone: React.FC<UploadZoneProps> = ({
    className,
    children,
    text,
    secondaryText,
    icon,
    value,
    style,
    onChange,
    ...props
}) => {
    const [files, setFiles] = React.useState<File[]>(value || props.defaultValue || []);
    const valueInited = React.useRef(false);
    const input = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (value === undefined) return;

        if (!valueInited.current) {
            valueInited.current = true;
            return;
        }

        updateFiles(value, false, true);
    }, [value]);

    React.useEffect(() => {
        if (props.defaultValue) updateFiles(props.defaultValue, false, false);
    }, []);

    const updateFiles = (files: File[], inputOrigin: boolean, callOnChange: boolean) => {
        setFiles(files);
        if (callOnChange) onChange?.({ value: files });

        if (!inputOrigin) {
            const dataTransfer = new DataTransfer();
            files.forEach((file) => dataTransfer.items.add(file));
            if (input.current) input.current.files = dataTransfer.files;
        }
    };

    const removeFile = (file: File) => {
        const findId = fileId(file);
        updateFiles(
            files.filter((file) => fileId(file) !== findId),
            false,
            true
        );
    };

    return (
        <div className={className} style={style}>
            <input
                ref={input}
                accept={props.accept}
                name={props.name}
                disabled={props.disabled}
                multiple={props.multiple}
                /* Hidden required inputs cause this error: https://stackoverflow.com/questions/22148080/an-invalid-form-control-with-name-is-not-focusable */
                /* required={props.required} */
                type="file"
                hidden
                onChange={(e) => {
                    updateFiles(Array.from(e.currentTarget.files || []), true, true);
                }}
            />
            <Droppable
                onDrop={(e) => {
                    if (!e.dataTransfer.files.length) return;
                    setFiles(Array.from(e.dataTransfer.files));
                }}
            >
                <div
                    className={clsx(
                        !props.disabled && "cursor-pointer",
                        "border-[1.5px] rounded-lg border-dashed transition hover:bg-primary/5 hover:border-info"
                    )}
                    onClick={() => input.current?.click()}
                >
                    {children || (
                        <div className="flex flex-col items-center justify-center gap-3 p-5">
                            {icon && <span className="text-[100px] text-primary">{icon}</span>}
                            <p>{text || "Upload"}</p>
                            {secondaryText !== "" && (
                                <p className="text-sm text-t2">{secondaryText || "Select or drop a File"}</p>
                            )}
                        </div>
                    )}
                </div>
            </Droppable>
            {props.renderFiles === "menu" && (
                <List
                    rounded="sm"
                    className="mt-2"
                    items={files.map((file) => ({
                        key: file.webkitRelativePath || file.name,
                        label: file.name,
                        tools: [
                            {
                                icon: props.removeIcon || "❌",
                                action: () => removeFile(file),
                                tooltip: "Remove",
                                color: "error",
                                key: "remove_toll",
                            },
                        ],
                    }))}
                />
            )}
            {typeof props.renderFiles === "function" && props.renderFiles(files)}
        </div>
    );
};
