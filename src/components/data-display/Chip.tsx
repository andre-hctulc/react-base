import clsx from "clsx";
import React from "react";
import type { Align, StyleProps } from "../../types";
import { alignSelfClass, collapse } from "../../util";
import XCircleOutlineIcon from "../icons/collection/XCircleOutline";
import Styled from "../shadow/Styled";

interface ChipProps extends StyleProps {
    children?: React.ReactNode;
    deletable?: boolean;
    endIcon?: React.ReactElement;
    startIcon?: React.ReactElement;
    onDelete?: React.MouseEventHandler<SVGSVGElement>;
    onClick?: React.MouseEventHandler<HTMLSpanElement>;
    /** @default "contained" */
    variant?: "outlined" | "contained" | "pale";
    alignSelf?: Align;
    hoverEffect?: boolean;
}

const Chip = React.forwardRef<HTMLSpanElement, ChipProps>((props, ref) => {
    const variant = props.variant || "contained";
    const size = "medium";
    const tc: any = {};
    const hoverEffect = props.hoverEffect ?? !!props.onClick;
    const [variantClasses, iconClasses] = collapse(
        variant,
        {
            contained: [
                [tc.contrastText, tc.bg, hoverEffect && tc.hover_bgDark, hoverEffect && tc.active_bgLight],
                [tc.contrastText],
            ],
            outlined: [
                [
                    "border",
                    tc.border,
                    tc.text,
                    hoverEffect && tc.hover_bgSuperLight,
                    hoverEffect && tc.active_bgLight,
                ],
                [tc.text],
            ],
            pale: [
                [
                    tc.bgSuperLight,
                    tc.text,
                    hoverEffect && tc.hover_bgLight,
                    hoverEffect && tc.active_bgSuperLight,
                ],
                [tc.text],
            ],
        },
        [[], []]
    );

    return (
        <span
            ref={ref}
            className={clsx(
                [
                    "inline-flex flex-row justify-center items-center rounded-[20px] whitespace-nowrap min-w-0 flex-shrink-0 transition-l duration-100",
                    alignSelfClass(props.alignSelf || "none"),
                    hoverEffect && "cursor-pointer",
                    variantClasses,
                ],
                props.className
            )}
            style={props.style}
            onClick={props.onClick}
        >
            {props.startIcon && <Styled className={clsx(iconClasses, "mr-1.5")}>{props.startIcon}</Styled>}
            {props.children}
            {props.deletable && (
                <XCircleOutlineIcon
                    className={clsx(
                        "cursor-pointer hover:text-opacity-70 ml-1.5 text-text-secondary",
                        iconClasses
                    )}
                    onClick={props.onDelete as any}
                />
            )}
            {props.endIcon && <Styled className={clsx(iconClasses, "ml-1.5")}>{props.endIcon}</Styled>}
        </span>
    );
});

Chip.displayName = "Chip";

export default Chip;
