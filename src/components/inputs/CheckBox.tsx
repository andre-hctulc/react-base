"use client";

import clsx from "clsx";
import Label from "./Label";
import React from "react";
import { randomId } from "../../util/system";
import type { InputLikeProps } from "./Input";
import type { PropsOf, StyleProps } from "../../types";
import { setRef } from "../../util";
import { useFormInput } from "./JSForm";
import Flex from "../layout/Flex";
import HelperText from "../text/HelperText";

export interface CheckBoxProps extends StyleProps, Omit<InputLikeProps<boolean>, "required" | "noBorder"> {
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
    slotProps?: { input?: PropsOf<"input">; helperText?: PropsOf<typeof HelperText> };
    inputRef?: (inp: HTMLInputElement | null) => void;
    vertical?: boolean;
}

const CheckBox = React.forwardRef<HTMLDivElement, CheckBoxProps>((props, ref) => {
    const id = React.useRef(randomId());
    const innerRef = React.useRef<HTMLInputElement>(null);
    const { error, readOnly, disabled } = useFormInput(props, innerRef.current);

    return (
        <Flex inline className={["flex-shrink-0", props.className]} ref={ref} minH0 style={props.style}>
            <div
                className={clsx(
                    "flex min-h-0",
                    props.vertical ? "flex-col-reverse" : "flex-row items-center"
                )}
            >
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
                    ref={(inp) => setRef<HTMLInputElement | null>(inp, innerRef, props.inputRef)}
                    className={clsx(
                        "transition duration-90",
                        props.vertical && "self-start",
                        props.label && !props.vertical && "mr-3",
                        props.slotProps?.input?.className
                    )}
                    onChange={props.onChange}
                    name={props.name}
                />
                {props.label && (
                    <Label variant={props.dense ? "caption" : "form_control"} htmlFor={id.current}>
                        {props.label}
                    </Label>
                )}
            </div>
            <HelperText errorMessage={props.errorMessage} error={error} {...props.slotProps?.helperText}>
                {props.helperText}
            </HelperText>
        </Flex>
    );
});

CheckBox.displayName = "CheckBox";

export default CheckBox;
