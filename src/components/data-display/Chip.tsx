import clsx from "clsx";
import React from "react";
import type { ThemeColor, Size, Align } from "../../types";
import { alignSelfClass, collapse, themeColor } from "../../util";
import XCircleOutlineIcon from "../icons/collection/XCircleOutline";
import Styled from "../others/Styled";

interface ChipProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    deletable?: boolean;
    endIcon?: React.ReactElement;
    startIcon?: React.ReactElement;
    color?: ThemeColor<true>;
    onDelete?: React.MouseEventHandler<SVGSVGElement>;
    onClick?: React.MouseEventHandler<HTMLSpanElement>;
    /** @default "contained" */
    variant?: "outlined" | "contained" | "pale";
    alignSelf?: Align;
    /** @default "medium" */
    size?: Size;
    hoverEffect?: boolean;
}

const Chip = React.forwardRef<HTMLSpanElement, ChipProps>((props, ref) => {
    const variant = props.variant || "contained";
    const size = props.size || "medium";
    const tc = themeColor(props.color || "accent");
    const hoverEffect = props.hoverEffect ?? !!props.onClick;
    const [variantClasses, iconClasses] = collapse(
        variant,
        {
            contained: [[tc.contrastText, tc.bg, hoverEffect && tc.hover_bgDark, hoverEffect && tc.active_bgLight], [tc.contrastText]],
            outlined: [["border", tc.border, tc.text, hoverEffect && tc.hover_bgSuperLight, hoverEffect && tc.active_bgLight], [tc.text]],
            pale: [[tc.bgSuperLight, tc.text, hoverEffect && tc.hover_bgLight, hoverEffect && tc.active_bgSuperLight], [tc.text]],
        },
        [[], []]
    );
    const [sizeClasses, iconSize] = collapse(
        size,
        {
            small: [" px-2.5 text-[11px] py-0.5", 12],
            medium: ["py-[4px] px-3.5 text-[13px]", 13],
            large: ["py-1.5 px-3 text-sm", 15],
        },
        []
    );

    return (
        <span
            ref={ref}
            className={clsx(
                "inline-flex flex-row justify-center items-center rounded-[20px] whitespace-nowrap min-w-0 flex-shrink-0 transition-l duration-100",
                sizeClasses,
                alignSelfClass(props.alignSelf || "none"),
                hoverEffect && "cursor-pointer",
                variantClasses,
                props.className
            )}
            style={props.style}
            onClick={props.onClick}
        >
            {props.startIcon && (
                <Styled size={iconSize} className={clsx(iconClasses, "mr-1.5")}>
                    {props.startIcon}
                </Styled>
            )}
            {props.children}
            {props.deletable && (
                <XCircleOutlineIcon
                    className={clsx("cursor-pointer hover:text-opacity-70 ml-1.5 text-text-secondary", iconClasses)}
                    onClick={props.onDelete as any}
                />
            )}
            {props.endIcon && (
                <Styled size={iconSize} className={clsx(iconClasses, "ml-1.5")}>
                    {props.endIcon}
                </Styled>
            )}
        </span>
    );
});

Chip.displayName = "Chip";

export default Chip;
