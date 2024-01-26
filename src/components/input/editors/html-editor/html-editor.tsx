import clsx from "clsx";
import React from "react";
import HTMLEditorToolbar from "./html-editor-toolbar";
import { EditorProps } from "../editor-interface";
import { useOnClickOutside } from "usehooks-ts";
import { PropsOf } from "@react-client/types";
import { GrowV100 } from "@react-client/components/transitions/GrowV";
import Fade from "@react-client/components/transitions/Fade";
import Interval from "@react-client/components/others/Interval";

interface HTMLEditorProps extends EditorProps {
    className?: string;
    style?: React.CSSProperties;
    onBlur?: (e: MouseEvent) => void;
    onFocus?: () => void;
    /**
     * Interval, nach dem content auf updates überprüft wird (in Millisekunden)
     * @default 1000
     * */
    updateInterval?: number;
    slotProps?: { editable?: PropsOf<"div"> };
    hideToolbar?: boolean;
    children?: React.ReactNode;
    editableRef?: (element: HTMLDivElement) => void;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    disabled?: boolean;
}

interface HTMLEditorContext {
    editable: HTMLDivElement | null;
}

const HTMLEditorContext = React.createContext<HTMLEditorContext | null>(null);

export default function HTMLEditor(props: HTMLEditorProps) {
    const [focused, setFocused] = React.useState(false);
    const editable = React.useRef<HTMLDivElement>(null);
    const lastContent = React.useRef(props.defaultValue);

    useOnClickOutside(editable, e => {
        checkChanges();
        setFocused(false);
        props.onBlur?.(e);
    });

    React.useEffect(() => {
        if (editable.current) {
            editable.current.innerHTML = props.defaultValue || "";
            props.editableRef?.(editable.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleClick(e: React.MouseEvent<HTMLDivElement>) {
        props.onClick?.(e);
        setFocused(true);
        props.onFocus?.();
    }

    function checkChanges() {
        if (!editable.current || !focused) return;

        const newContent = editable.current.innerHTML;

        if (editable.current && newContent !== lastContent.current) {
            props.onChange?.(newContent);
            lastContent.current = newContent;
        }
    }

    return (
        <HTMLEditorContext.Provider value={{ editable: editable.current }}>
            <div className={clsx("flex flex-col min-h-0", props.className)} style={props.style} onClick={handleClick}>
                {focused && <Interval onUpdate={checkChanges} delay={1000} />}
                <GrowV100 in={!props.hideToolbar}>
                    <HTMLEditorToolbar />
                </GrowV100>
                <div className="relative flex flex-col flex-grow min-h-0">
                    <Fade in={!!props.children}>
                        <div className="absolute right-2 top-2">{props.children}</div>
                    </Fade>
                    {/* Input Area */}
                    <div
                        ref={editable}
                        className={clsx(
                            "flex-grow px-1 focus:outline-0 box-border rounded",
                            props.error && "border border-error",
                            focused && "",
                            props.slotProps?.editable?.className
                        )}
                        contentEditable={!props.readOnly && !props.disabled}
                    />
                </div>
            </div>
        </HTMLEditorContext.Provider>
    );
}
