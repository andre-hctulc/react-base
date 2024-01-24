"use client";

import React, { CSSProperties, KeyboardEvent, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { GrowV100 } from "@react-client/components/transitions/grow-v";
import TextEditorToolbar from "./text-editor-toolbar";
//import { isDescendentOf } from "@client-util/dom";
import { getEditableSelection } from "./text-editor-util";
import Stack from "@react-client/components/layout/containers/stack";

// interface TextEditorContextType {
//     small: boolean;
//     focused: boolean;
//     setFocused: (focused: boolean) => void;
// }

// const TextEditorContext = React.createContext<TextEditorContextType>(null as any);

// export function useTextEditor() {
//     const ctx = React.useContext(TextEditorContext);
//     return ctx;
// }

function htmlEncode(s: string) {
    let ret_val = "";

    for (let char of s) {
        const code = char.codePointAt(0);
        if (code && code > 127) ret_val += "&#" + code + ";";
        else ret_val += char;
    }

    return ret_val;
}

export type TextEditorParameter = {
    ctl?: HTMLElement;
    getHTML?: () => string;
    getText?: () => string;
    reset?: () => void;
};

export type dragDropTextEditor = {
    drop: () => void;
};

interface TextEditorProps {
    defaultValue: string;
    parameter?: TextEditorParameter;
    className?: string;
    style?: React.CSSProperties;
    contentPara?: any;
    dragDrop?: dragDropTextEditor;
    readOnly?: boolean;
    // small?: boolean;
    //onFocus?: () => void;
    onBlur?: () => void;
    onChange?: (html: string, text: string) => void;
    onContentClick?: (e: React.MouseEvent) => void;
    onRendert?: (ctl: HTMLDivElement) => void;
    showToolbar?: boolean;
    children?: React.ReactNode;
}

export function TextEditor(props: TextEditorProps) {
    let dragDropProps: any;
    const classes = clsx("flex flex-col", props.className);
    const [focused, setFocused] = useState(false);
    const root = React.useRef<HTMLDivElement>(null);
    const [actDragOver, setActDragOver] = useState(false);

    function onBlur(html: string, text: string) {
        if (props.onChange) props.onChange(html, text);
    }

    // React.useEffect(() => {
    //     const body = document.body;

    //     if (!body || !focused) return;

    //     const blurListener: EventListener = e => {
    //         if (e.target && root.current && isDescendentOf(e.target as HTMLElement, root.current)) return;

    //         props.onBlur?.();
    //         setFocused(false);
    //     };

    //     body.addEventListener("click", blurListener);

    //     return () => {
    //         body.removeEventListener("click", blurListener);
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [focused]);

    if (props.dragDrop)
        dragDropProps = {
            //draggable: true,

            // onDragStart: (e: React.DragEvent) => {
            //     e.stopPropagation();
            //     e.dataTransfer.effectAllowed = "move";
            //     //if (props.dragDrop) props.dragDrop.actDragElement = xxx;
            // },

            onDragOver: (e: React.DragEvent) => {
                e.stopPropagation();
                e.preventDefault();
                setActDragOver(true);
            },

            onDragLeave: (e: React.DragEvent) => {
                e.stopPropagation();
                e.preventDefault();
                setActDragOver(false);
            },

            onDrop: (e: React.DragEvent) => {
                e.stopPropagation();
                setActDragOver(false);
                if (props.dragDrop) props.dragDrop.drop();
            },
        };

    // const focus: React.MouseEventHandler = e => {
    //     e.stopPropagation();
    //     props.onFocus?.();
    //     setFocused(true);
    // };

    return (
        <div className={classes} ref={root} onClick={focus} style={props.style}>
            {/* <TextEditorContext.Provider value={{ small: !!props.small, focused, setFocused }}> */}
            {!props.readOnly && (
                <GrowV100 in={props.showToolbar !== false}>
                    <TextEditorToolbar>{props.children}</TextEditorToolbar>
                </GrowV100>
            )}
            <TextEditorContent
                // onBlur={props.onBlur}
                // onFocus={props.onFocus}
                html={props.defaultValue}
                param={props.parameter}
                readOnly={props.readOnly}
                onChange={onBlur}
                onContentClick={props.onContentClick}
                onRendert={props.onRendert}
                para={{ ...props.contentPara, ...dragDropProps }}
            ></TextEditorContent>
            {/* </TextEditorContext.Provider> */}
        </div>
    );
}

export function TextEditorContent(props: {
    html: string;
    param?: TextEditorParameter;
    style?: React.CSSProperties;
    readOnly?: boolean;
    onChange?: (html: string, text: string) => void;
    //onFocus?: React.FocusEventHandler<HTMLDivElement>;
    //onBlur?: React.FocusEventHandler<HTMLDivElement>;
    onContentClick?: (e: React.MouseEvent) => void;
    onRendert?: (ctl: HTMLDivElement) => void;
    para?: any;
}) {
    const contentBox = React.useRef<HTMLDivElement>(null);
    //const textEditor = useTextEditor();
    const classes = clsx("flex-grow p-1 focus:outline-0 bg-transparent min-h-0"); //, props.maxTextFieldHeight && "overflow-y-auto");

    React.useEffect(() => {
        if (!contentBox.current) return;

        contentBox.current.innerHTML = props.html;

        if (props.param) {
            props.param.getHTML = () => {
                if (!contentBox.current) return "";
                return htmlEncode(contentBox.current.innerHTML);
            };

            props.param.getText = () => {
                if (!contentBox.current) return "";
                return contentBox.current.innerText;
            };

            props.param.reset = () => {
                if (!contentBox.current) return;
                contentBox.current.innerHTML = props.html;
            };
        }

        if (props.onRendert) props.onRendert(contentBox.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.html]);

    function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
        switch (e.code) {
            case "Tab":
                e.preventDefault();

                const sel = getEditableSelection();
                if (!sel) return;

                if (sel.isCollapsed) document.execCommand("insertText", false, "\t");
                else document.execCommand(e.shiftKey ? "outdent" : "indent", false);
                break;
        }
    }

    function onClick(e: React.MouseEvent) {
        //if (props.onFocusChanged) props.onFocusChanged();
        if (props.onContentClick) props.onContentClick(e);
    }

    return (
        <div
            className={classes}
            ref={contentBox}
            contentEditable={!props.readOnly}
            onInput={() => {
                if (contentBox.current) props.onChange?.(contentBox.current.innerHTML, contentBox.current.innerText);
            }}
            onClick={onClick}
            onKeyDown={onKeyDown}
            style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                //fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                padding: "2px", // Damit man den Cursor sieht. Der ist sonst durch den Rahmen verdeckt!
                ...props.style,
            }}
            {...props.para}
        />
    );
}

function html_encode(s: string) {
    var ret_val = "";
    for (let char of s) {
        const code = char.codePointAt(0);
        if (code && code > 127) ret_val += "&#" + code + ";";
        else ret_val += char;
    }
    return ret_val;
}
