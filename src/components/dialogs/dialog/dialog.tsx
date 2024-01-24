"use client";

import Card from "@react-client/components/layout/containers/cards/card";
import Overlay from "@react-client/components/layout/overlays/overlay";
import Transition from "@react-client/components/transitions/transition";
import type { PropsOf } from "@react-client/util";
import clsx from "clsx";
import React from "react";

export interface DialogProps {
    open: boolean;
    onClose?: React.MouseEventHandler<HTMLDivElement>;
    children?: React.ReactNode;
    slotProps?: { card?: Omit<PropsOf<typeof Card>, "onClick"> };
    className?: string;
    style?: React.CSSProperties;
    size?: DialogDim;
    minSize?: DialogDim;
    maxSize?: DialogDim;
}

/** _Breite_ oder [_Breite_, _Höhe_] */
export type DialogDim = number | string | null | [number | string, number | string];

export const DialogSize = {
    auto: 0,
    small: 400,
    medium: 450,
    large: 600,
} as const;

function getSizeStyle(size: DialogDim | undefined): [number | string | undefined, number | string | undefined] {
    if (!size) return [undefined, undefined];
    return Array.isArray(size) ? size : typeof size === "number" || typeof size === "string" ? [size, undefined] : [undefined, undefined];
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
                style={props.style}
                ref={ref}
                className={clsx("flex flex-col min-w-0 items-center justify-center cursor-default !m-0", props.className)}
            >
                <Card
                    {...props.slotProps?.card}
                    onClick={e => e.stopPropagation()}
                    className={clsx("shadow-md !bg-bg border-box relative", props.slotProps?.card?.className)}
                    style={{ ...props.slotProps?.card?.style, height, width, minHeight, minWidth, maxWidth, maxHeight, zIndex: 100 }}
                >
                    {props.children}
                </Card>
            </Overlay>
        </Transition>
    );
});

Dialog.displayName = "Dialog";

export default Dialog;
