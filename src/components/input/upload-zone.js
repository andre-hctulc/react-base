"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Droppable } from "./droppable";
import React from "react";
import { List } from "../containers";
import clsx from "clsx";
const fileId = (file) => file.webkitRelativePath || file.name;
/**
 * ### Props
 * `required` - **Not supported** due to use of hidden input
 */
export const UploadZone = ({ className, children, text, secondaryText, icon, value, style, onChange, ...props }) => {
    const [files, setFiles] = React.useState(value || props.defaultValue || []);
    const valueInited = React.useRef(false);
    const input = React.useRef(null);
    React.useEffect(() => {
        if (value === undefined)
            return;
        if (!valueInited.current) {
            valueInited.current = true;
            return;
        }
        updateFiles(value, false, true);
    }, [value]);
    React.useEffect(() => {
        if (props.defaultValue)
            updateFiles(props.defaultValue, false, false);
    }, []);
    const updateFiles = (files, inputOrigin, callOnChange) => {
        setFiles(files);
        if (callOnChange)
            onChange?.({ value: files });
        if (!inputOrigin) {
            const dataTransfer = new DataTransfer();
            files.forEach((file) => dataTransfer.items.add(file));
            if (input.current)
                input.current.files = dataTransfer.files;
        }
    };
    const removeFile = (file) => {
        const findId = fileId(file);
        updateFiles(files.filter((file) => fileId(file) !== findId), false, true);
    };
    return (_jsxs("div", { className: className, style: style, children: [_jsx("input", { ref: input, accept: props.accept, name: props.name, disabled: props.disabled, multiple: props.multiple, 
                /* Hidden required inputs cause this error: https://stackoverflow.com/questions/22148080/an-invalid-form-control-with-name-is-not-focusable */
                /* required={props.required} */
                type: "file", hidden: true, onChange: (e) => {
                    updateFiles(Array.from(e.currentTarget.files || []), true, true);
                } }), _jsx(Droppable, { onDrop: (e) => {
                    if (!e.dataTransfer.files.length)
                        return;
                    setFiles(Array.from(e.dataTransfer.files));
                }, children: _jsx("div", { className: clsx(!props.disabled && "cursor-pointer", "border-[1.5px] rounded-lg border-dashed transition hover:bg-primary/5 hover:border-info"), onClick: () => input.current?.click(), children: children || (_jsxs("div", { className: "flex flex-col items-center justify-center gap-3 p-5", children: [icon && _jsx("span", { className: "text-[100px] text-primary", children: icon }), _jsx("p", { children: text || "Upload" }), secondaryText !== "" && (_jsx("p", { className: "text-sm text-t2", children: secondaryText || "Select or drop a File" }))] })) }) }), props.renderFiles === "menu" && (_jsx(List, { rounded: "sm", className: "mt-2", items: files.map((file) => ({
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
                })) })), typeof props.renderFiles === "function" && props.renderFiles(files)] }));
};
