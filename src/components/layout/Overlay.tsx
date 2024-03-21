"use client";

import React from "react";
import { createPortal } from "react-dom";
import { StyleProps } from "../../types";
import { styleProps } from "../../util";

interface OverlayProps extends StyleProps {
    children?: React.ReactNode;
    absolute?: boolean;
    invisible?: boolean;
    disablePointerEvents?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    open?: boolean;
    zIndex?: number;
    /** @default true */
    blurEffect?: boolean;
    /** @default true */
    portal?: boolean;
}

const Overlay = React.forwardRef<HTMLDivElement, OverlayProps>((props, ref) => {
    if (props.open === false) return null;

    const main = (
        <div
            ref={ref}
            {...styleProps(
                {
                    className: [
                        "top-0 left-0 w-full h-full border-5 cursor-default text-text",
                        props.blurEffect !== false && !props.invisible && "backdrop-blur-[2px] ",
                        !props.invisible && "bg-common-black/20",
                        props.absolute ? "absolute" : "fixed",
                        "z-50",
                    ],
                    style: {
                        pointerEvents: props.disablePointerEvents ? "none" : undefined,
                        zIndex: props.zIndex,
                    },
                },
                props
            )}
            onClick={(e) => {
                e.stopPropagation();
                props.onClick?.(e);
            }}
        >
            {props.children}
        </div>
    );

    if (props.portal === false) return main;

    return createPortal(main, document.body);
});

Overlay.displayName = "Overlay";

export default Overlay;
