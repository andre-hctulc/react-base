"use client";

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { StyleProps } from "../../types/index.js";
import { usePopper } from "react-popper";
import type { Placement } from "@popperjs/core";
import { Transition } from "@headlessui/react";
import { Overlay } from "../layout/overlay.js";

const popover = tv({
    base: "absolute",
    variants: {
        width: {
            auto: "w-auto",
            xs: "w-[150px]",
            sm: "w-[250px]",
            md: "w-[370px]",
            lg: "w-[500px]",
            xl: "w-[600px]",
            "2xl": "w-[800px]",
            "3xl": "w-[1000px]",
        },
        minWidth: {
            auto: "w-auto",
            xs: "min-w-[150px]",
            sm: "min-w-[200px]",
            md: "min-w-[370px]",
            lg: "min-w-[500px]",
            xl: "min-w-[600px]",
            "2xl": "min-w-[800px]",
            "3xl": "min-w-[1000px]",
        },
        height: {
            auto: "w-auto",
            xs: "h-20",
            sm: "h-24",
            md: "h-32",
            lg: "h-48",
            xl: "h-64",
            "2xl": "h-96",
            "3xl": "h-128",
        },
        minHeight: {
            auto: "w-auto",
            xs: "min-h-20",
            sm: "min-h-24",
            md: "min-h-32",
            lg: "min-h-48",
            xl: "min-h-64",
            "2xl": "min-h-96",
            "3xl": "min-h-128",
        },
    },
    defaultVariants: {},
});

export interface PopoverProps extends VariantProps<typeof popover>, StyleProps {
    anchor: HTMLElement | null | undefined;
    children?: React.ReactNode;
    open: boolean;
    position?: Placement;
    /**
     * @default 4
     */
    gap?: number;
    /**
     * Gap to the window border
     * @default 4
     */
    frameMargin?: number;
    onClose?: () => void;
    bg?: boolean;
    zIndex?: "none" | "10" | "20" | "30" | "40" | "50";
    noInteraction?: boolean;
    /**
     * Portal the popover to the body
     * @default true
     */
    portal?: boolean;
}

const getOffset = (position: Placement, gap: number) => {
    if (position.startsWith("left") || position.startsWith("right")) return [gap, 0];
    return [0, gap];
};

/**
 * The popover is portaled to the body
 */
export const Popover: React.FC<PopoverProps> = props => {
    const [popperElement, setPopperElement] = React.useState<HTMLDivElement | null>(null);
    const pos = props.position ?? "bottom";
    const [isPositioned, setIsPositioned] = React.useState(false); // Track whether the popover is positioned
    const { styles, attributes } = usePopper(props.anchor, popperElement, {
        placement: pos,
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: getOffset(pos, props.gap ?? 4) as [number, number], // Adjust the offset of the popover
                },
            },
            {
                name: "preventOverflow",
                options: {
                    boundary: document.body,
                    padding: props.frameMargin ?? 4, // Adds gap from the window border
                },
            },
            // {
            //     name: "flip",
            //     options: {
            //         boundary: document.body,
            //         fallbackPlacements: ["top", "right", "left", "bottom"], // Define fallback placements if flipping is needed
            //     },
            // },
        ],
    });

    React.useEffect(() => {
        if (styles.popper?.top) {
            setIsPositioned(true);
        }
    }, [styles.popper?.top]);

    return (
        <Overlay
            noInteraction={props.noInteraction || !props.open}
            bg={props.bg ? "transparent1" : "transparent"}
            onClick={e => {
                e.stopPropagation();
                props.onClose?.();
            }}
            portal={props.portal ?? true}
            zIndex={props.zIndex}
        >
            <Transition
                as={React.Fragment}
                show={props.open}
                enter="transition-opacity ease-out duration-150"
                enterFrom="opacity-0 "
                enterTo="opacity-100"
                leave="transition-opacity ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0 "
            >
                <div
                    ref={setPopperElement}
                    style={{ ...styles.popper, ...props.style }}
                    onClick={e => {
                        e.stopPropagation();
                    }}
                    {...attributes.popper}
                    className={popover({
                        minWidth: props.minWidth,
                        width: props.width,
                        height: props.height,
                        className: [props.className, !isPositioned && "invisible"],
                        minHeight: props.minHeight,
                    })}
                >
                    {props.children}
                </div>
            </Transition>
        </Overlay>
    );
};
