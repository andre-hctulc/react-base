import React from "react";

export interface FormControlProps {
    name: string | undefined;
    type: "json" | "string";
    disabled: boolean;
    readOnly: boolean;
    value: any;
    required: boolean | undefined;
}

export const formControlTypeAttr = "data-fc_type";
export const formControlAttr = "data-form_control";

/**
 * Wird in Custom-Input Komponenten verwendet, um kompatibel mit Formularen sein zu können.
 * Es wird ein _input_ gerendet (`type="hidden"`), welches den aktuellen Wert des Custom-Inputs repräsentiert.
 */
export default function FormControl(props: FormControlProps) {
    const value = React.useMemo(() => {
        if (!props.name) return "";
        if (props.type === "string") return props.value;
        else return JSON.stringify(props.value);
    }, [props.value, props.type, props.name]);
    if (!props.name) return null;
    const formAttrs = { [formControlAttr]: true, [formControlTypeAttr]: props.type };
    return (
        <input value={value} name={props.name} required={props.required} data-inptype={props.type} disabled={props.disabled} readOnly={props.readOnly} {...formAttrs} />
    );
}
