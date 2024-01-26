"use client";

import Chip from "@react-client/components/data-display/chip/chip";
import clsx from "clsx";
import dynamic from "next/dynamic";
import React from "react";

const Markdown = dynamic(() => import("@react-client/components/data-display/Markdown/Markdown"));

export default function MarkdownEditor(props: {
    className?: string;
    style?: React.CSSProperties;
    defaultValue: string;
    onChange?: (md: string) => void;
    disableAutoPreview?: boolean;
}) {
    const [content, setContent] = React.useState(props.defaultValue);
    const [editMode, setEditMode] = React.useState(false);
    const classes = clsx("flex min-h-1 relative", props.className);
    const textareaClasses = clsx("flex flex-grow md:max-w-[50%] focus:outline-unset p-1 border-0", editMode ? "" : "sm:!hidden md:!block");
    const previewClsases = clsx("flex-grow md:border-l overflow-y-auto min-h-0 md:max-w-[50%]", editMode ? "sm:!hidden md:!block" : "");

    function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const newValue = e.target.value;
        setContent(newValue);
        props.onChange?.(e.target.value);
    }

    return (
        <div className={classes} style={props.style}>
            <Chip className="absolute justify-end right-2 my-3 mx-2 sm:!flex md:!hidden" onClick={() => setEditMode(!editMode)}>
                {editMode ? "Vorschau" : "Bearbeiten"}
            </Chip>
            <textarea className={textareaClasses} style={{ resize: "none" }} defaultValue={props.defaultValue} onChange={onChange} />
            <Markdown className={previewClsases}>{content}</Markdown>
        </div>
    );
}
