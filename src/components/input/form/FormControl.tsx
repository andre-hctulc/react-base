import React from "react";
import { setRef } from "../../../util";
import { useJSForm } from "./JSForm";

export interface FormControlProps {
    name: string | undefined;
    type: "json" | "string";
    value: any;
    required: boolean | undefined;
}

export const formControlTypeAttr = "data-form_control_type";
export const formControlAttr = "data-form_control";

/**
 * Provides compatibilty with HTML-Forms for custom Input-Components.
 * Renders a input with `type="hidden"`.
 */
const FormControl = React.forwardRef<HTMLInputElement, FormControlProps>((props, ref) => {
    const value = React.useMemo(() => {
        if (!props.name) return "";
        if (props.type === "string") return props.value;
        else return JSON.stringify(props.value);
    }, [props.value, props.type, props.name]);
    const inp = React.useRef<HTMLInputElement>(null);
    const formCtx = useJSForm();

    // Form/Input onChange Handlers are not triggerd by setting the value directly. Only User-Input does trigger these handlers.
    // So we have to trigger change handlers of the Form manually
    React.useEffect(() => {
        if (!inp.current) return;
        const i = inp.current;
        formCtx?.change(i, props.value);
        return () => {
            formCtx?.change(i, undefined);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);

    if (!props.name) return null;

    const formAttrs = { [formControlAttr]: true, [formControlTypeAttr]: props.type };

    return <input {...formAttrs} ref={i => setRef<HTMLInputElement | null>(i, inp, ref)} value={value} name={props.name} required={props.required} type="hidden" />;
});

FormControl.displayName = "FormControl";

export default FormControl;
