"use client";

import { tv, type VariantProps } from "tailwind-variants";
import type { PropsOf, StyleProps } from "../../types/index.js";
import { Overlay } from "../layout/overlay.js";
import { useEffect, useState, type FC } from "react";

const dialog = tv({
    base: "",
    variants: {},
    defaultVariants: {
        variant: "default",
    },
});

const dialogPanel = tv({
    base: [
        "flex flex-col transition-all",
        "max-w-full max-h-full bg-paper rounded-xl backdrop-blur-2xl m-4 box-border",
        "duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0",
    ],
    variants: {
        width: {
            sm: "w-[400px]",
            md: "w-[500px]",
            lg: "w-[700px]",
            none: "",
        },
        height: {
            none: "",
            sm: "h-[250px]",
            md: "h-[400px]",
            lg: "h-[550px]",
            xl: "h-[800px]",
        },
        maxHeight: {
            none: "",
            sm: "max-h-[250px]",
            md: "max-h-[400px]",
            lg: "max-h-[550px]",
            xl: "max-h-[800px]",
        },
        shadow: {
            sm: "shadow-xs",
            md: "shadow-sm",
            lg: "shadow-md",
            xl: "shadow-lg",
        },
    },
    defaultVariants: {
        width: "md",
        shadow: "lg",
    },
});

export interface DialogProps
    extends VariantProps<typeof dialog>,
        VariantProps<typeof dialogPanel>,
        StyleProps {
    open: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
    loading?: boolean;
    /**
     * @default true
     */
    closable?: boolean;
    /**
     * Retain mounted during closed state.
     */
    retainMount?: boolean;
    overlayProps?: PropsOf<typeof Overlay>;
    panelProps?: PropsOf<"div">;
}

// TODO loading
export const Dialog: FC<DialogProps> = ({
    open,
    children,
    className,
    closable = true,
    onClose,
    width,
    height,
    shadow,
    style,
    overlayProps,
    panelProps,
    retainMount,
}) => {
    const [render, setRender] = useState(open);

    useEffect(() => {
        if (open) {
            setRender(true);
        } else {
            const timer = setTimeout(() => setRender(false), 300); // Match the transition duration
            return () => clearTimeout(timer);
        }
    }, [open]);

    return (
        <Overlay
            portal
            centerContent
            zIndex="50"
            {...overlayProps}
            variant="fixed"
            className={dialog({ className: [className, overlayProps?.className] })}
            style={{ ...style, ...overlayProps?.style }}
            onClick={(e) => {
                if (closable && onClose) onClose();
                overlayProps?.onClick?.(e);
            }}
            noInteraction={open ? (overlayProps?.noInteraction ?? false) : true}
            bg={open ? (overlayProps?.bg ?? "transparent1") : "transparent"}
        >
            <div
                {...panelProps}
                data-closed={open ? undefined : true}
                onClick={(e) => {
                    e.stopPropagation();
                    panelProps?.onClick?.(e);
                }}
                className={dialogPanel({ width, height, shadow, className: panelProps?.className })}
            >
                {retainMount ? children : render ? children : null}
            </div>
        </Overlay>
    );
};
