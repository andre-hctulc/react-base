import clsx from "clsx";
import React from "react";
import { collapse, eventProps } from "../../util";
import Styled from "../shadow/Styled";
import type { ChildrenProps, EventProps, PartialPropsOf, StyleProps } from "../../types";

interface ButtonProps extends StyleProps, ChildrenProps, EventProps {
    /** @default "text" */
    variant?: "text" | "outlined" | "contained";
    size?: "small" | "medium" | "large";
    startIcon?: React.ReactElement | false | "" | null;
    endIcon?: React.ReactElement | false | "" | null;
    start?: React.ReactNode;
    end?: React.ReactNode;
    disabled?: boolean;
    unstyled?: boolean;
    /**
     * The default value of normal _buttons_ ist "button" or "submit" für _buttons_ in forms.
     * For this button the default value is **always** "button"
     * @default "button"
     * */
    type?: "button" | "submit" | "reset";
    // * Form
    form?: string;
    formMethod?: string;
    formTarget?: string;
    formNoValidate?: boolean;
    draggable?: boolean;
    slotProps?: { icon?: PartialPropsOf<typeof Styled> };
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const variant = props.variant || "text";
    const disabled = !!props.disabled;
    const size = props.size || "medium";
    const [height, fontSize, iconSize, px] = collapse(
        size,
        {
            small: [30, 13, 14, "px-2"],
            medium: [35, 14, 16, "px-3"],
            large: [40, 15, 18, "px-4"],
        },
        []
    );
    const [variantClasses, variantIconClasses] = collapse(
        variant,
        {
            contained: [[disabled ? "bg-opacity-80" : "hover:bg-opacity-80 active:bg-opacity-90"], []],
            text: [[disabled ? "bg-opacity-0" : "bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-20"], []],
            outlined: [
                [
                    "border",
                    [disabled ? "bg-opacity-5" : "bg-opacity-10 hover:bg-opacity-20 active:bg-opacity-30"],
                ],
                [],
            ],
        },
        [] as any
    );

    return (
        <button
            form={props.form}
            formMethod={props.formMethod}
            formTarget={props.formTarget}
            formNoValidate={props.formNoValidate}
            formEncType=""
            type={props.type || "button"}
            disabled={props.disabled}
            ref={ref}
            className={clsx([
                "inline-flex justify-center items-center rounded flex-shrink-0 box-border whitespace-nowrap transition duration-100 transition-bg",
                px,
                !props.unstyled && variantClasses,
            ])}
            style={{ height, fontSize, ...props.style }}
            {...eventProps(props)}
            draggable={props.draggable}
        >
            {props.start}
            {props.startIcon && (
                <Styled
                    {...props.slotProps?.icon}
                    className={clsx(
                        size === "small" ? "mr-1" : "mr-2",
                        props.slotProps?.icon?.className,
                        variantIconClasses
                    )}
                    size={iconSize}
                >
                    {props.startIcon}
                </Styled>
            )}
            {props.children}
            {props.endIcon && (
                <Styled
                    {...props.slotProps?.icon}
                    className={clsx(
                        size === "small" ? "ml-1" : "ml-2",
                        props.slotProps?.icon?.className,
                        variantIconClasses
                    )}
                    size={iconSize}
                >
                    {props.endIcon}
                </Styled>
            )}
            {props.end}
        </button>
    );
});

Button.displayName = "Button";

export default Button;
