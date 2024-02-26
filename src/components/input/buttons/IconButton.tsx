import clsx from "clsx";
import React from "react";
import type { DynamicSize } from "../../../types";
import { collapse } from "../../../util";
import Styled from "../../others/Styled";

interface IconButtonProps {
    children: React.ReactElement;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    style?: React.CSSProperties;
    /** @default "medium" */
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    /** @default outlined */
    variant?: "contained" | "outlined";
    iconSize?: DynamicSize;
    type?: "submit" | "reset" | "button" | undefined;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>((props: IconButtonProps, ref) => {
    // Diese Größen sollten mit denen von `ToggleIconButton` übereinstimmen!
    const [sizeClasses, iconSize] = collapse(props.size || "medium", { small: ["w-6 h-6", 14], medium: ["w-8 h-8", 17], large: ["w-10 h-10", 20] }, []);
    const variantClasses = collapse(props.variant || "outlined", {
        outlined: ["", !props.disabled && "hover:bg-bg-dark/40 active:bg-bg-dark/80"],
        contained: ["border bg-bg-paper", !props.disabled && "hover:bg-bg-paper2 active:bg-bg-paper3"],
    });

    return (
        <button
            type={props.type || "button"}
            disabled={props.disabled}
            ref={ref}
            className={clsx(
                "IconButton inline-flex items-center justify-center rounded-lg aspect-square flex-shrink-0 box-border",
                sizeClasses,
                props.disabled && "!cursor-default",
                variantClasses,
                props.className
            )}
            onClick={props.onClick}
            style={props.style}
        >
            <Styled disabled={props.disabled} size={props.iconSize || iconSize}>
                {props.children}
            </Styled>
        </button>
    );
});

IconButton.displayName = "IconButton";

export default IconButton;
