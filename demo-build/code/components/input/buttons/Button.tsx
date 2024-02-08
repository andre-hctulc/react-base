

import { collapse } from "u/src/helpers";
import clsx from "clsx";
import React from "react";
import { ThemeColor } from "../../../types";
import { themeColor } from "../../../util";
import Styled from "../../others/Styled";

interface ButtonProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    /** @default "text" */
    variant?: "text" | "outlined" | "contained";
    size?: "small" | "medium" | "large";
    startIcon?: React.ReactElement | false | "" | null;
    endIcon?: React.ReactElement | false | "" | null;
    start?: React.ReactNode;
    end?: React.ReactNode;
    disabled?: boolean;
    color?: ThemeColor | "text_secondary";
    unstyled?: boolean;
    /**
     * Der Standard-Wert für normale _buttons_ ist "button" oder "submit" für _buttons_ in forms.
     * Hier ist der Stanmdard-Wert **immer** "button", um unerwartetes Verhalten in Formularen zu vermeiden.
     * @default "button"
     * */
    type?: "button" | "submit" | "reset";
    // * Form
    form?: string;
    formMethod?: string;
    formTarget?: string;
    formNoValidate?: boolean;
}

// TODO transition für background etc.

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const variant = props.variant || "text";
    const disabled = !!props.disabled;
    const color = props.color || "primary";
    const { bg, text, border, contrastText } =
        color === "text_secondary"
            ? { bg: "bg-text-secondary", text: "text-text-secondary", border: "border-text-secondary", contrastText: "text-text-contrast" }
            : themeColor(color);
    const size = props.size || "medium";
    const [height, fontSize, iconSize, px] = collapse(size, {
        small: [30, 13, 14, "px-2"],
        medium: [35, 14, 16, "px-3"],
        large: [40, 15, 18, "px-4"],
    });
    const [variantClasses, variantIconClasses] = collapse(variant, {
        contained: [[bg, contrastText, disabled ? "bg-opacity-80" : "hover:bg-opacity-80 active:bg-opacity-90"], [contrastText]],
        text: [[text, bg, disabled ? "bg-opacity-0" : "bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-20"], [text]],
        outlined: [["border", [border, bg, text, disabled ? "bg-opacity-5" : "bg-opacity-10 hover:bg-opacity-20 active:bg-opacity-30"]], [text]],
    });

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
            className={clsx(
                "flex justify-center items-center rounded flex-shrink-0 box-border whitespace-nowrap transition duration-100 transition-bg",
                px,
                !props.unstyled && variantClasses,
                props.className
            )}
            onClick={props.onClick}
            style={{ height, fontSize, ...props.style }}
        >
            {props.start}
            {props.startIcon && (
                <Styled className={clsx(size === "small" ? "mr-1" : "mr-2", variantIconClasses)} size={iconSize}>
                    {props.startIcon}
                </Styled>
            )}
            {props.children}
            {props.endIcon && (
                <Styled className={clsx(size === "small" ? "ml-1" : "ml-2", variantIconClasses)} size={iconSize}>
                    {props.endIcon}
                </Styled>
            )}
            {props.end}
        </button>
    );
});

Button.displayName = "Button";

export default Button;
