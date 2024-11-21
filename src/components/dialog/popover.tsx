import React from "react";
import { tv, type ClassValue, type VariantProps } from "tailwind-variants";
import type { XStyleProps } from "../../types";
import { usePopper } from "react-popper";
import type { Placement } from "@popperjs/core";
import { Transition } from "@headlessui/react";
import { Overlay } from "../layout";

const popover = tv({
    base: "absolute overflow-hidden bg",
    variants: {
        width: {
            none: "",
            auto: "w-auto",
            xs: "w-[150px]",
            sm: "w-[200px]",
            md: "w-[370px]",
            lg: "w-[500px]",
            xl: "w-[600px]",
            "2xl": "w-[800px]",
            "3xl": "w-[1000px]",
        },
        minWidth: {
            none: "",
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
            none: "",
            auto: "w-auto",
            xs: "h-20",
            sm: "h-24",
            md: "h-32",
            lg: "h-48",
            xl: "h-64",
            "2xl": "h-96",
            "3xl": "h-128",
        },
        shadow: {
            none: "",
            sm: "shadow-sm",
            base: "shadow",
            md: "shadow-md",
            lg: "shadow-lg",
            xl: "shadow-xl",
            "2xl": "shadow-2xl",
        },
        rounded: {
            none: "",
            sm: "rounded-sm",
            base: "rounded",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            "2xl": "rounded-2xl",
        },
        padding: {
            none: "",
            xs: "p-1",
            sm: "p-2",
            md: "p-4",
            lg: "p-6",
            xl: "p-8",
        },
    },
    defaultVariants: {
        shadow: "base",
        width: "none",
        height: "none",
        rounded: "base",
        padding: "none",
    },
});

interface PopoverProps extends VariantProps<typeof popover>, XStyleProps {
    anchor: HTMLElement | null | undefined;
    children?: React.ReactNode;
    /**
     * @default true
     */
    border?: boolean;
    panelClasses?: ClassValue;
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
}

const getOffset = (position: Placement, gap: number) => {
    if (position.startsWith("left") || position.startsWith("right")) return [gap, 0];
    return [0, gap];
};

export const Popover: React.FC<PopoverProps> = (props) => {
    const [popperElement, setPopperElement] = React.useState<HTMLDivElement | null>(null);
    const pos = props.position ?? "bottom";
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
    const wasOpen = React.useRef(props.open);

    React.useEffect(() => {
        if (props.open && !wasOpen.current) {
            wasOpen.current = true;
        }
    }, [open]);

    // Don't render if not open and was not open,
    // this is to fix the animation issue on first open.
    // Without this fix, the popover visible adjust its position from 0,0 to the actual position.
    if (!open && !wasOpen.current) return null;

    return (
        <Overlay
            noInteraction={!props.open}
            bg={props.bg ? "transparent-1" : "transparent"}
            onClick={(e) => {
                e.stopPropagation();
                props.onClose?.();
            }}
            portal
            zIndex={props.zIndex}
        >
            <Transition
                as={React.Fragment}
                show={props.open}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <div
                    ref={setPopperElement}
                    style={{ ...styles.popper, ...props.style }}
                    onClick={(e) => e.stopPropagation()}
                    {...attributes.popper}
                    className={popover({
                        shadow: props.shadow,
                        minWidth: props.minWidth,
                        width: props.width,
                        padding: props.padding,
                        height: props.height,
                        className: [props.border && "border", props.className],
                    })}
                >
                    {props.children}
                </div>
            </Transition>
        </Overlay>
    );
};
