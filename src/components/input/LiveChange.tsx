import React from "react";

interface InputProps {
    onChange?: (...args: any) => void;
    onBlur?: (...args: any) => void;
    disabled?: boolean;
    value?: any;
    defaultValue?: any;
    helperText?: string;
    error?: boolean;
}

interface LiveChangeProps<T = any> {
    /** @default "blur" */
    trigger?: "blur" | "change";
    children: React.ReactElement<InputProps>;
    action: (newValue: T) => Promise<string | boolean | void> | string | boolean | void;
    /** Sollte im regelfall _nicht_ `undefined` sein */
    defaultValue: any;
    preventForwardProps?: (keyof InputProps)[];
    onError?: (error: string | false) => void;
    onSuccess?: (newTitle: string) => void;
}

export function eventToValue(e: any) {
    if (e && typeof e === "object") {
        // e.target.value (e.g. input, TextField...)
        if (e.hasOwnProperty("target")) return (e as any).target.value;
        // e.value
        else if (e.hasOwnProperty("value")) return (e as any).value;
        // e
        else return e;
    } else return e;
}

export default function LiveChange<T = any>(props: LiveChangeProps<T>) {
    const defaultValue = props.defaultValue === undefined ? props.children.props.defaultValue : props.defaultValue;
    const savedValue = React.useRef(defaultValue);
    const trigger = props.trigger || "blur";
    const [isError, setIsError] = React.useState(false);
    const [errMessage, setErrMessage] = React.useState<string>();
    const [value, setValue] = React.useState(defaultValue);
    const [isLoading, setIsLaoding] = React.useState(false);
    const child = (() => {
        const newProps: InputProps = {
            ...props.children.props,
            onChange: async (...args: any) => {
                props.children.props.onChange?.(...args);
                if (trigger === "change") action(args[0]);
                else setValue(eventToValue(args[0]));
            },
            onBlur: (...args: any) => {
                props.children.props.onBlur?.(...args);
                if (trigger === "blur") action(args[0]);
            },
            disabled: !!props.children.props.disabled || isLoading,
            value,
            helperText: errMessage || props.children.props.helperText,
            error: isError,
        };

        for (const p of props.preventForwardProps || []) delete newProps[p];

        return React.cloneElement(props.children, newProps);
    })();

    async function action(e: any) {
        const newValue = eventToValue(e);

        if (newValue === savedValue.current) return;

        try {
            setIsLaoding(true);

            const result = await props.action(newValue);

            // error
            if (typeof result === "string") {
                setIsError(true);
                setErrMessage(result);
                setValue(savedValue.current);
                props.onError?.(result);
            } else if (result === false) {
                setIsError(true);
                setErrMessage(undefined);
                setValue(savedValue.current);
                props.onError?.(false);
            }
            // success
            else {
                setIsError(false);
                setErrMessage(undefined);
                setValue(newValue);
                savedValue.current = newValue;
                props.onSuccess?.(newValue);
            }
        } catch (err) {
            setIsError(true);
            setErrMessage(undefined);
            setValue(savedValue.current);
        } finally {
            setIsLaoding(false);
        }
    }

    return child;
}
