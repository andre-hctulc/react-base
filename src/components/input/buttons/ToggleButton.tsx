"use client";

import clsx from "clsx";
import Styled from "../../others/Styled";
import { collapse } from "../../../util";

interface ToggleButtonProps {
    active?: boolean;
    children: React.ReactElement;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    style?: React.CSSProperties;
    value?: string;
    size?: "small" | "medium" | "large";
}

export default function ToggleButton(props: ToggleButtonProps) {
    // Diese Größen sollten mit denen von `IconButton` übereinstimmen!
    const [sizeClasses, iconSize] = collapse(props.size || "medium", { small: ["w-6 h-6", 14], medium: ["w-8 h-8", 17], large: ["w-10 h-10", 20] });

    function handleClick(e: any) {
        props.onClick?.(e);
    }

    return (
        <button
            type="button"
            className={clsx(
                "ToggleButton bg-bg flex-shrink-0 cursor-pointer flex items-center justify-center rounded border hover:bg-action-hover active:bg-action-active",
                sizeClasses,
                props.className
            )}
            style={props.style}
            onClick={handleClick}
        >
            <Styled color={props.active ? "info" : "accent"} size={iconSize}>
                {props.children}
            </Styled>
        </button>
    );
}
