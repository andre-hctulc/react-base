import React from "react";
import Input from "./base/Input/Input";
import TextArea from "./base/TextArea/TextArea";

export default function UpdateInput(props: {
    onBlurAction: (newValue: string) => PromiseLike<string | boolean | void> | string | boolean | void;
    defaultValue: string;
    label?: string;
    className?: string;
    style?: React.CSSProperties;
    onError?: (err: unknown) => void;
    disabled?: boolean;
    fullWidth?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    textarea?: boolean;
}) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [value, setValue] = React.useState(props.defaultValue);
    const preValueRef = React.useRef<string>(props.defaultValue);

    async function onBlur(event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const newValue = event.target.value;

        if (newValue === preValueRef.current) return;

        setIsLoading(true);

        try {
            const newComputedValue = await props.onBlurAction(newValue);
            if (typeof newComputedValue === "string") setValue(newComputedValue);
            else if (newComputedValue !== false) setValue(newValue);
            else setValue(preValueRef.current);
        } catch (err) {
            props.onError?.(err);
            setValue(preValueRef.current);
        } finally {
            setIsLoading(false);
        }
    }

    const Comp = props.textarea ? TextArea : Input;

    return (
        <Comp
            style={props.style}
            label={props.label}
            className={props.className}
            onBlur={onBlur}
            onFocus={e => (preValueRef.current = e.target.value)}
            onChange={e => setValue(e.target.value)}
            value={value}
            disabled={props.disabled || isLoading}
            readOnly={props.readOnly}
            placeholder={props.placeholder}
        />
    );
}
