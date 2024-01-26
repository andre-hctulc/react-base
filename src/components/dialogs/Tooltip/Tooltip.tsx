"use client";

import React from "react";
import clsx from "clsx";
import Typography from "@react-client/components/text/Typography/Typography";
import { firstInt } from "@client-util/iterables";
import { PropsOf } from "@react-client/types";
import { setRef } from "@react-client/util";
import Popover from "../Popover/Popover";

interface TooltipProps {
    children: React.ReactElement;
    content: React.ReactNode;
    /** @default 30 */
    disappearTimeout?: number;
    enterDelay?: number;
    /** Enter-Delay nach dem ersten Entern */
    enterNextDelay?: number;
    slotProps?: { popover?: PropsOf<typeof Popover>["slotProps"]; wrapper?: PropsOf<"div"> };
    disabled?: boolean;
    inactive?: boolean;
    childRef?: React.ForwardedRef<Element>;
}

export const TooltipBehaviour = { default: { enterDelay: 230, enterNextDelay: 410 } };

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
    const childRef = React.useRef<Element | null>(null);
    const entered = React.useRef(false);
    const child = React.cloneElement(props.children, {
        props: {
            ...props.children.props,
        },
        ref: (element: any) => {
            setRef(childRef, element);
            setRef(props.childRef, element);
        },
    });
    const [open, setOpen] = React.useState(false);
    const closeTimeout = React.useRef<NodeJS.Timeout>();
    const openTimeout = React.useRef<NodeJS.Timeout>();
    const [tipRef, setTipRef] = React.useState<Element | null>(null);

    React.useEffect(() => {
        const child = childRef.current;

        if (!child) return;

        const listeners: [keyof HTMLElementEventMap, (e: any) => void][] = [];

        const addListener = (e: keyof HTMLElementEventMap, listener: (e: MouseEvent) => void) => {
            listeners.push([e, listener]);
            tipRef?.addEventListener(e, listener as any);
            child?.addEventListener(e, listener as any);
        };

        addListener("mouseenter", () => {
            if (closeTimeout.current) clearTimeout(closeTimeout.current);

            const enterDelay = entered.current && typeof props.enterNextDelay === "number" ? props.enterNextDelay : props.enterDelay;

            if (enterDelay) {
                openTimeout.current = setTimeout(() => {
                    setOpen((entered.current = true));
                }, enterDelay);
            } else setOpen((entered.current = true));
        });

        addListener("mouseleave", () => {
            if (openTimeout.current) clearTimeout(openTimeout.current);

            closeTimeout.current = setTimeout(
                () => {
                    setOpen(false);
                },
                firstInt(props.disappearTimeout, 30)
            );
        });

        return () => {
            listeners.forEach(([e, listener]) => {
                tipRef?.removeEventListener(e, listener);
                child?.removeEventListener(e, listener);
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [childRef, tipRef]);

    if (props.inactive) return props.children;

    return (
        <>
            {child}
            <Popover
                ref={ref}
                disablePointerEvents
                position={{ vertical: "top", horizontal: "center" }}
                slotProps={{
                    ...props.slotProps?.popover,
                    card: {
                        border: false,
                        ...props.slotProps?.popover?.card,
                        ref: ref => {
                            setTipRef(ref);
                            setRef<any>(props.slotProps?.popover?.card?.ref, ref);
                        },
                    },
                }}
                open={open && !props.disabled}
                anchor={childRef.current}
                noCardBg
                noCardBorder
                noCardPadding
            >
                <div
                    {...props.slotProps?.wrapper}
                    className={clsx("!text-xs !px-2 !py-[4px] !bg-common-black/70 text-text-contrast !shadow-sm rounded", props.slotProps?.wrapper?.className)}
                >
                    {typeof props.content === "string" ? <Typography className="!text-xs">{props.content}</Typography> : props.content}
                </div>
            </Popover>
        </>
    );
});

Tooltip.displayName = "Tooltip";

export default Tooltip;
