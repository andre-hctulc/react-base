"use client";

import Styled from "@react-client/components/others/styled";
import { collapse } from "@client-util/style-util";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface ToggleButtonProps {
    active?: boolean;
    children: React.ReactElement;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    style?: React.CSSProperties;
    value?: string;
    href?: string;
    size?: "small" | "medium" | "large";
}

export default function ToggleButton(props: ToggleButtonProps) {
    // Diese Größen sollten mit denen von `IconButton` übereinstimmen!
    const [sizeClasses, iconSize] = collapse(props.size || "medium", { small: ["w-6 h-6", 14], medium: ["w-8 h-8", 17], large: ["w-10 h-10", 20] });
    const classes = clsx(
        "ToggleButton bg-bg flex-shrink-0 cursor-pointer flex items-center justify-center rounded border hover:bg-action-hover active:bg-action-active",
        sizeClasses,
        props.className
    );
    const router = useRouter();

    function handleClick(e: any) {
        if (props.href && !props.active) router.push(props.href);
        props.onClick?.(e);
    }

    return (
        <button type="button" className={classes} style={props.style} onClick={handleClick}>
            <Styled color={props.active ? "info" : "accent"} size={iconSize}>
                {props.children}
            </Styled>
        </button>
    );
}
