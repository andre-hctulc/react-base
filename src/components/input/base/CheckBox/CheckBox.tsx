"use client";

import HelperText from "@react-client/components/text/HelperText/HelperText";
import { setRef } from "@react-client/util";
import clsx from "clsx";
import Label from "../../Label/Label";
import React from "react";
import { useFormInput } from "../../form/JSForm/JSForm";
import Stack from "@react-client/components/layout/containers/Stack/Stack";
import { randomId } from "@client-util/strings";
<<<<<<< HEAD:src/components/input/base/check-box.tsx
import { InputLikeProps } from "./input";
import { PropsOf } from "@react-client/types";
=======
import { InputLikeProps } from "../Input/Input";
>>>>>>> 9141326d02a4250083ce3e61d74598fc4dcb439c:src/components/input/base/CheckBox/CheckBox.tsx

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
    const innerRef = React.useRef<HTMLInputElement>(null);
    const { error, readOnly, disabled } = useFormInput(props, innerRef.current);

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
                        setRef(innerRef, inp);
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
