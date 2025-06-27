"use client";

import type { PropsOf, StyleProps } from "../../types/index.js";
import { Droppable } from "./droppable.js";
import { List, type ListItemDef } from "../containers/list.js";
import clsx from "clsx";
import type { InputLikeProps } from "./types.js";
import { useEffect, useRef, useState, type FC, type ReactNode } from "react";
import { XIcon } from "../icons/x.js";
import { Toolbar } from "../containers/toolbar.js";
import { IconButton } from "./icon-button.js";

interface UploadZoneProps extends StyleProps, InputLikeProps<File[]> {
    children?: ReactNode;
    secondaryText?: string;
    text?: string;
    multiple?: boolean;
    icon?: ReactNode;
    renderFiles?: ((files: File[]) => ReactNode) | "menu";
    accept?: string;
    mainProps?: PropsOf<"div">;
}

const fileId = (file: File) => file.webkitRelativePath || file.name;

/**
 * ### Props
 * `required` - **Not supported** due to use of hidden input
 */
export const UploadZone: FC<UploadZoneProps> = ({
    className,
    children,
    text,
    secondaryText,
    icon,
    value,
    style,
    onChange,
    mainProps,
    ...props
}) => {
    const [files, setFiles] = useState<File[]>(value || props.defaultValue || []);
    const valueInited = useRef(false);
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (value === undefined) return;

        if (!valueInited.current) {
            valueInited.current = true;
            return;
        }

        updateFiles(value, false, true);
    }, [value]);

    useEffect(() => {
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
        <div className={clsx("flex flex-col", className)} style={style}>
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
                {...mainProps}
                onDrop={(e) => {
                    if (!e.dataTransfer.files.length) return;
                    setFiles(Array.from(e.dataTransfer.files));
                    mainProps?.onDrop?.(e);
                }}
                className={clsx(
                    "grow min-h-0 overflow-y-auto",
                    !props.disabled && "cursor-pointer",
                    "border-[1.5px] rounded-lg border-dashed transition hover:bg-primary/5 hover:border-info",
                    mainProps?.className
                )}
                onClick={(e) => {
                    input.current?.click();
                    mainProps?.onClick?.(e);
                }}
            >
                <div className="flex flex-col items-center justify-center gap-3 p-5">
                    {icon && <span className="text-[100px] text-primary">{icon}</span>}
                    <p>{text || "Upload"}</p>
                    {secondaryText !== "" && (
                        <p className="text-sm text-t2">{secondaryText || "Select or drop a File"}</p>
                    )}
                </div>
            </Droppable>
            {props.renderFiles === "menu" && (
                <List
                    rounded="sm"
                    className="mt-2"
                    items={files.map<ListItemDef>((file) => ({
                        key: file.webkitRelativePath || file.name,
                        label: file.name,
                        listItemProps: {
                            end: (
                                <Toolbar>
                                    <IconButton color="error" onClick={() => removeFile(file)}>
                                        <XIcon />
                                    </IconButton>
                                </Toolbar>
                            ),
                        },
                    }))}
                />
            )}
            {typeof props.renderFiles === "function" && props.renderFiles(files)}
            {children}
        </div>
    );
};
