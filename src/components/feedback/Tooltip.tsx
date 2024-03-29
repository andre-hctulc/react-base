"use client";

import clsx from "clsx";
import React from "react";
import type { PropsOf, SlotProps } from "../../types";
import { setRef } from "../../util";
import Typography from "../text/Typography";
import Popover from "../layout/Popover";
import { Card } from "../layout";

interface TooltipProps extends SlotProps<{ card: typeof Card; wrapper: "div" }> {
    children: React.ReactElement;
    content: React.ReactNode;
    /** @default 30 */
    disappearTimeout?: number;
    enterDelay?: number;
    /** Enter-Delay nach dem ersten Entern */
    enterNextDelay?: number;
    disabled?: boolean;
    position?: PropsOf<typeof Popover>["position"];
    inactive?: boolean;
    childRef?: React.Ref<Element>;
}

export const TooltipBehaviour = { default: { enterDelay: 230, enterNextDelay: 410 } };

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
    const childRef = React.useRef<Element | null>(null);
    const entered = React.useRef(false);
    const child = React.cloneElement(props.children, {
        props: {
            ...props.children.props,
        },
        ref: (element: any) => setRef(element, childRef, props.childRef),
    });
    const [open, setOpen] = React.useState(false);
    const closeTimeout = React.useRef<NodeJS.Timeout>();
    const openTimeout = React.useRef<NodeJS.Timeout>();
    // const [tipRef, setTipRef] = React.useState<Element | null>(null);
    const tipRef = React.useRef<Element | null>();

    React.useEffect(
        () => {
            const child = childRef.current;

            if (!child) return;

            const tip = tipRef.current;
            const listeners: [keyof HTMLElementEventMap, (e: any) => void][] = [];

            const addListener = (e: keyof HTMLElementEventMap, listener: (e: MouseEvent) => void) => {
                listeners.push([e, listener]);
                tip?.addEventListener(e, listener as any);
                child?.addEventListener(e, listener as any);
            };

            addListener("mouseenter", () => {
                if (closeTimeout.current) clearTimeout(closeTimeout.current);

                const enterDelay =
                    entered.current && typeof props.enterNextDelay === "number"
                        ? props.enterNextDelay
                        : props.enterDelay;

                if (enterDelay) {
                    openTimeout.current = setTimeout(() => {
                        setOpen((entered.current = true));
                    }, enterDelay);
                } else setOpen((entered.current = true));
            });

            addListener("mouseleave", () => {
                if (openTimeout.current) clearTimeout(openTimeout.current);

                closeTimeout.current = setTimeout(() => {
                    setOpen(false);
                }, props.disappearTimeout ?? 30);
            });

            return () => {
                listeners.forEach(([e, listener]) => {
                    tip?.removeEventListener(e, listener);
                    child?.removeEventListener(e, listener);
                });
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [childRef.current, tipRef.current, props.enterDelay, props.enterNextDelay, props.disappearTimeout]
    );

    if (props.inactive) return props.children;

    return (
        <>
            {child}
            <Popover
                position={props.position || { vertical: "top", horizontal: "center" }}
                cardBg="transparent"
                noCardBorder
                cardShadow="small"
                noCardPadding
                disablePointerEvents
                open={open && !props.disabled}
                anchor={childRef.current}
                ref={ref}
                slotProps={{
                    card: {
                        border: false,
                        ...props.slotProps?.card,
                        ref: (card) => setRef<any>(card, tipRef, props.slotProps?.card?.ref),
                    },
                }}
            >
                <div
                    {...props.slotProps?.wrapper}
                    className={clsx(
                        "!text-xs !px-2 !py-[4px] !bg-common-black/70 text-text-contrast !shadow-sm rounded",
                        props.slotProps?.wrapper?.className
                    )}
                >
                    {typeof props.content === "string" ? (
                        <Typography className="!text-xs">{props.content}</Typography>
                    ) : (
                        props.content
                    )}
                </div>
            </Popover>
        </>
    );
});

Tooltip.displayName = "Tooltip";

export default Tooltip;
