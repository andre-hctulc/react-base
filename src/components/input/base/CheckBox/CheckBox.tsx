"use client";

import HelperText from "@react-client/components/text/helper-text";
import { setRef, type PropsOf } from "@react-client/util";
import clsx from "clsx";
import Label from "../../label";
import React from "react";
import { useFormInput } from "../../form/js-form";
import Stack from "@react-client/components/layout/containers/Stack/Stack";
import { randomId } from "@client-util/strings";
import { InputLikeProps } from "../Input/Input";

export interface CheckBoxProps extends Omit<InputLikeProps<boolean>, "required" | "noBorder"> {
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
    className?: string;
    style?: React.CSSProperties;
    slotProps?: { input?: PropsOf<"input">; helperText?: PropsOf<typeof HelperText> };
    inputRef?: (inp: HTMLInputElement | null) => void;
}

const CheckBox = React.forwardRef<HTMLDivElement, CheckBoxProps>((props, ref) => {
    const id = React.useRef(randomId());
    const { error, readOnly, disabled } = useFormInput(props);

    return (
        <Stack className={clsx("", props.label && "mt-3", props.className)} minH0 style={props.style}>
            <div className="flex min-h-0" style={props.style} ref={ref}>
                <input
                    {...props.slotProps?.input}
                    onFocus={props.onFocus}
                    onClick={props.onClick}
                    onBlur={props.onBlur}
                    checked={props.value}
                    defaultChecked={props.defaultValue}
                    /* readOnly alleine hat keinen Effekt bei type type="checkbox" */
                    disabled={disabled}
                    readOnly={readOnly}
                    id={id.current}
                    type="checkbox"
                    ref={inp => {
                        setRef(props.inputRef, inp as any);
                    }}
                    className={clsx("transition duration-90", props.label && "mr-3", props.slotProps?.input?.className)}
                    onChange={props.onChange}
                    name={props.name}
                />
                {props.label && (
                    <Label variant={props.dense ? "caption" : "form_control"} htmlFor={id.current} noMargin>
                        {props.label}
                    </Label>
                )}
            </div>
            <HelperText errorMessage={props.errorMessage} error={error} {...props.slotProps?.helperText}>
                {props.helperText}
            </HelperText>
        </Stack>
    );
});

CheckBox.displayName = "CheckBox";

export default CheckBox;
