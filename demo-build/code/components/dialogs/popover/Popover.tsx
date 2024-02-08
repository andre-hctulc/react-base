"use client";

import useElement from "../../../hooks/dom/useElement";
import clsx from "clsx";
import Card from "../../layout/cards/Card";
import Overlay from "../../layout/overlays/Overlay";
import React from "react";
import { setRef } from "../../../util";
import { firstInt } from "u/src/iterables";
import { PropsOf } from "../../../types";
import { useAlerts } from "../../../contexts/AlertsProvider";

type PopoverPosition = { horizontal: "left" | "start" | "right" | "end" | "center"; vertical: "top" | "start" | "bottom" | "end" | "center" };

export interface PopoverProps {
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
    open: boolean;
    anchor: Element | undefined | null;
    slotProps?: { card?: PropsOf<typeof Card> };
    onClose?: React.MouseEventHandler<HTMLDivElement>;
    disablePointerEvents?: boolean;
    /** @default { horizontal: "start", vertical: "bottom" } */
    position?: Partial<PopoverPosition>;
    // * Width
    matchAnchorWidth?: boolean;
    matchAnchorMinWidth?: boolean;
    // * Card
    noCardPadding?: boolean;
    cardShadow?: boolean;
    // width
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    // height
    height?: number;
    minHeight?: number;
    maxHeight?: number;
    adjustMaxHeight?: boolean;
    adjustMaxWidth?: boolean;
    noCardBorder?: boolean;
    cardVariant?: PropsOf<typeof Card>["variant"];
    noCardBg?: boolean;
    cardRef?: React.ForwardedRef<Element>;
    // * Popover
    /** @default true */
    invisible?: boolean;
    /**
     * Hat nur einnen Effekt, wenn `invisible=false` ist.
     * @default true
     * */
    blurEffect?: boolean;
    /** @default true */
    portal?: boolean;
    // * Mindestabstände
    /**
     * Mindestabstand der `Card` zum `anchor`
     * @default 5
     * */
    buffer?: number;
    /**
     * Mindestabstand der `Card` zum Window-Rand
     * @default 5
     * */
    edgeBuffer?: number;
    /** @default true */
    flipPosition?: boolean;
}

type Margins = { mr: number; ml: number; mt: number; mb: number };

function getMargins(element: DOMRect): Margins {
    const mt = element.y;
    const ml = element.x;
    const mr = window.innerWidth - (element.x + element.width);
    const mb = window.innerHeight - (element.y + element.height);

    return { mt, ml, mb, mr };
}

function calcVertical(
    cardRect: DOMRect,
    anchorRect: DOMRect,
    buffer: number,
    edgeBuffer: number,
    y: PopoverPosition["vertical"]
): { top: number | undefined; bottom: number | undefined } {
    const max = window.innerHeight - cardRect.height - buffer;
    let top: number | undefined;
    let bottom: number | undefined;

    switch (y) {
        case "top":
            bottom = window.innerHeight - anchorRect.top + buffer;
            break;
        case "start":
            top = anchorRect.top + buffer;
            break;
        case "bottom":
            top = anchorRect.bottom + buffer;
            break;
        case "end":
            bottom = window.innerHeight - anchorRect.bottom + buffer;
            break;
        case "center":
            top = anchorRect.top + anchorRect.height / 2 - (cardRect.height || 0) / 2;
            break;
    }

    if (top) {
        if (top < 0) top = edgeBuffer;
        else if (top >= max) top = max - edgeBuffer;
    }

    if (bottom) {
        if (bottom < 0) top = edgeBuffer;
        else if (bottom >= max) top = max - edgeBuffer;
    }

    return { top, bottom };
}

function calcHorizontal(
    cardRect: DOMRect,
    anchorRect: DOMRect,
    buffer: number,
    edgeBuffer: number,
    x: PopoverPosition["horizontal"]
): { left: number | undefined; right: number | undefined } {
    const max = window.innerWidth - cardRect.width - buffer;
    let left: number | undefined;
    let right: number | undefined;

    switch (x) {
        case "left":
            right = window.innerWidth - anchorRect.left + buffer;
            break;
        case "start":
            left = anchorRect.left + buffer;
            break;
        case "right":
            left = anchorRect.right + buffer;
            break;
        case "end":
            right = window.innerWidth - anchorRect.right + buffer;
            break;
        case "center":
            left = anchorRect.x + anchorRect.width / 2 - (cardRect.width || 0) / 2;
            break;
    }

    if (left) {
        if (left < 0) left = edgeBuffer;
        else if (left >= max) left = max - edgeBuffer;
    }

    if (right) {
        if (right < 0) right = edgeBuffer;
        else if (right >= max) right = max - edgeBuffer;
    }

    return { left, right };
}

function calcMaxWidth(anchorRect: DOMRect, buffer: number, edgeBuffer: number, x: PopoverPosition["horizontal"]): number {
    switch (x) {
        case "center":
            return window.innerWidth - 2 * edgeBuffer;
        case "left":
            return anchorRect.left - buffer - edgeBuffer;
        case "right":
            return window.innerWidth - anchorRect.right - buffer - edgeBuffer;
        case "start":
            return window.innerWidth - anchorRect.left - edgeBuffer - buffer;
        case "end":
            return anchorRect.right - edgeBuffer - buffer;
    }
}

function calcMaxHeight(anchorRect: DOMRect, buffer: number, edgeBuffer: number, y: PopoverPosition["vertical"]): number {
    switch (y) {
        case "center":
            return window.innerHeight - 2 * edgeBuffer;
        case "top":
            return anchorRect.top - buffer - edgeBuffer;
        case "bottom":
            return window.innerHeight - anchorRect.bottom - buffer - edgeBuffer;
        case "start":
            return window.innerHeight - anchorRect.top - edgeBuffer - buffer;
        case "end":
            return anchorRect.bottom - edgeBuffer - buffer;
    }
}

function flipPosition(expectedSize: { height: number; width: number }, pos: PopoverPosition, anchorRect: DOMRect) {
    const expectedHeight = expectedSize.height;
    const expectedWidth = expectedSize.width;
    const margins = getMargins(anchorRect);

    switch (pos.vertical) {
        case "bottom":
            if (margins.mb < expectedHeight && margins.mb < margins.mt) pos.vertical = "top";
            break;
        case "top":
            if (margins.mt < expectedHeight && margins.mt < margins.mb) pos.vertical = "bottom";
            break;
        case "start":
            if (anchorRect.top < expectedHeight && anchorRect.top < margins.mb) pos.vertical = "bottom";
            break;
        case "end":
            if (anchorRect.bottom < expectedHeight && anchorRect.bottom < margins.mb) pos.vertical = "bottom";
            break;
    }

    switch (pos.horizontal) {
        case "right":
            if (margins.mr < expectedWidth && margins.mr < margins.ml) {
                pos.horizontal = "left";
            }
            break;
        case "left":
            if (margins.ml < expectedWidth && margins.ml < margins.mr) {
                pos.horizontal = "right";
            }
            break;
        case "start":
            if (expectedWidth > anchorRect.right) {
                pos.horizontal = "right";
            }
            break;
    }
}

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>((props, ref) => {
    const [cardRef, setCardRef] = React.useState<Element | null>(null);
    const anchor = useElement(props.anchor);
    const card = useElement(cardRef);
    const buffer = firstInt(props.buffer, 5);
    const edgeBuffer = firstInt(props.edgeBuffer, 5);
    const { info } = useAlerts();
    const cardStyle = React.useMemo<Pick<React.CSSProperties, "top" | "left" | "height" | "minHeight" | "maxHeight" | "width" | "minWidth" | "maxWidth">>(() => {
        if (!anchor || !card || !props.open) return {};
        const pos = { horizontal: props.position?.horizontal || "start", vertical: props.position?.vertical || "bottom" };

        const cardRect = card.rect();
        const anchorRect = anchor.rect();

        const width = props.width || (props.matchAnchorWidth ? anchorRect.width : undefined);
        const height = props.height;
        const minWidth = props.minWidth || (props.matchAnchorMinWidth ? anchorRect.width : undefined);
        const minHeight = props.minHeight || height || undefined;

        if (props.flipPosition !== false) {
            const expectedHeight = minHeight || cardRect.height;
            const expectedWidth = minWidth || cardRect.width;
            flipPosition({ height: expectedHeight, width: expectedWidth }, pos, anchorRect);
        }

        let maxHeight = props.maxHeight;
        let maxWidth = props.maxWidth;

        if (props.adjustMaxHeight) {
            const newMaxHeight = calcMaxHeight(anchorRect, buffer, edgeBuffer, pos.vertical);
            if (maxHeight === undefined || newMaxHeight < maxHeight) maxHeight = newMaxHeight;
        }
        if (props.adjustMaxWidth) {
            const newMaxWidth = calcMaxWidth(anchorRect, buffer, edgeBuffer, pos.horizontal);
            if (maxWidth === undefined || newMaxWidth < maxWidth) maxWidth = newMaxWidth;
        }

        // info(pos.horizontal + " _ " + pos.vertical);

        const { left, right } = calcHorizontal(cardRect, anchorRect, buffer, edgeBuffer, pos.horizontal);
        const { top, bottom } = calcVertical(cardRect, anchorRect, buffer, edgeBuffer, pos.vertical);

        return { left, top, maxHeight, maxWidth, width, height, minHeight, minWidth, right, bottom }; // TODO
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [anchor, card, props.position?.horizontal, props.position?.vertical, props.open, buffer, edgeBuffer]);

    if (!props.open) return null;

    return (
        <Overlay
            portal={props.portal}
            ref={ref}
            disablePointerEvents={props.disablePointerEvents}
            /* Margin 0, damit in space-x|y containers keinen Einfluss */
            className={clsx("!m-0", props.className)}
            invisible={props.invisible !== false}
            style={props.style}
            onClick={props.onClose}
            blurEffect={props.blurEffect}
        >
            <Card
                border={!props.noCardBorder}
                shadow={props.cardShadow}
                {...props.slotProps?.card}
                onClick={e => {
                    e.stopPropagation();
                    props.slotProps?.card?.onClick?.(e);
                }}
                style={{
                    ...props.slotProps?.card?.style,
                    ...cardStyle,
                    //visibility: cardStyle.left === undefined || cardStyle.top === undefined ? "hidden" : undefined,
                }}
                className={clsx(
                    "absolute pointer-events-auto max-h-full",
                    props.noCardBg && "!bg-transparent",
                    props.noCardPadding && "!p-0",
                    props.slotProps?.card?.className
                )}
                ref={element => {
                    setCardRef(element);
                    //setRef(cardRef, element);
                    setRef<any>(props.cardRef, element);
                    setRef<any>(props.slotProps?.card?.ref, element);
                }}
                variant={props.cardVariant || props.slotProps?.card?.variant || "contained"}
            >
                {props.children}
            </Card>
        </Overlay>
    );
});

Popover.displayName = "Popover";

export default Popover;
