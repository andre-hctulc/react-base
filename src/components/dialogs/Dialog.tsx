"use client";

import clsx from "clsx";
import React from "react";
import { Transition } from "react-transition-group";
import type { PropsOf, StyleProps } from "../../types";
import Card from "../layout/Card";
import Overlay from "../layout/Overlay";

export interface DialogProps extends StyleProps {
    open: boolean;
    onClose?: React.MouseEventHandler<HTMLDivElement>;
    children?: React.ReactNode;
    slotProps?: { card?: Omit<PropsOf<typeof Card>, "onClick"> };
    size?: DialogDim;
    minSize?: DialogDim;
    maxSize?: DialogDim;
}

/** _width_ or [_width_, _height_] */
export type DialogDim = number | string | null | [number | string, number | string];

export const DialogSize = {
    auto: 0,
    small: 400,
    medium: 450,
    large: 600,
} as const;

function getSizeStyle(
    size: DialogDim | undefined
): [number | string | undefined, number | string | undefined] {
    if (!size) return [undefined, undefined];
    return Array.isArray(size)
        ? size
        : typeof size === "number" || typeof size === "string"
        ? [size, undefined]
        : [undefined, undefined];
}

/**
 * @css
 */
const Dialog = React.forwardRef<HTMLDivElement, DialogProps>((props, ref) => {
    const [width, height] = getSizeStyle(props.size === undefined ? DialogSize.medium : props.size);
    const [minWidth, minHeight] = getSizeStyle(props.minSize);
    const [maxWidth, maxHeight] = getSizeStyle(props.maxSize);

    return (
        <Transition in={props.open} transitionName="T-Dialog" unmountOnExit timeout={180}>
            <Overlay
                onClick={props.onClose}
                ref={ref}
                className={[
                    "flex flex-col min-w-0 items-center justify-center cursor-default !m-0",
                    props.className,
                ]}
                style={props.style}
            >
                <Card
                    {...props.slotProps?.card}
                    onClick={(e) => e.stopPropagation()}
                    className={clsx("shadow-md !bg-bg border-box relative", props.slotProps?.card?.className)}
                    style={{
                        ...props.slotProps?.card?.style,
                        height,
                        width,
                        minHeight,
                        minWidth,
                        maxWidth,
                        maxHeight,
                        zIndex: 100,
                    }}
                >
                    {props.children}
                </Card>
            </Overlay>
        </Transition>
    );
});

Dialog.displayName = "Dialog";

export default Dialog;
