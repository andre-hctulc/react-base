import useElement from "@react-client/hooks/dom/use-element";
import clsx from "clsx";
import Card from "../../layout/containers/cards/card";
import Overlay from "../../layout/overlays/overlay";
import React from "react";
import { setRef, type PropsOf } from "@react-client/util";
import { firstInt } from "@client-util/iterables";

export interface PopoverProps {
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
    open: boolean;
    anchor: Element | undefined | null;
    slotProps?: { card?: PropsOf<typeof Card> };
    onClose?: React.MouseEventHandler<HTMLDivElement>;
    disablePointerEvents?: boolean;
    /** @default { horizontal: "left", vertical: "bottom" } */
    position?: { horizontal?: "left" | "right" | "center"; vertical?: "top" | "bottom" | "center" };
    // * Width
    matchAnchorWidth?: boolean;
    matchAnchorMinWidth?: boolean;
    // * Card
    noCardPadding?: boolean;
    cardShadow?: boolean;
    cardWidth?: number;
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
}

function getMargins(element: DOMRect) {
    const mt = element.y;
    const ml = element.x;
    const mr = window.innerWidth - (element.x + element.width);
    const mb = window.innerHeight - (element.y + element.height);

    return { mt, ml, mb, mr };
}

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>((props, ref) => {
    const [cardRef, setCardRef] = React.useState<Element | null>(null);
    const anchor = useElement(props.anchor);
    const card = useElement(cardRef);
    const pos = { x: props.position?.horizontal || "left", y: props.position?.vertical || "bottom" };
    const buffer = firstInt(props.buffer, 5);
    const edgeBuffer = firstInt(props.edgeBuffer, 5);
    const left = React.useMemo<number | undefined>(() => {
        if (!anchor || !card || !props.open) return undefined;

        const cardRect = card.rect();
        const anchorRect = anchor.rect();
        const horizontal = pos.x || "left";
        const { ml } = getMargins(anchorRect);
        const max = window.innerWidth - cardRect.width;
        let left: number;

        switch (horizontal) {
            case "center":
                left = anchorRect.x + anchorRect.width / 2 - (cardRect.width || 0) / 2;
                break;
            case "right":
                left = ml + anchorRect.width - buffer;
                break;
            case "left":
                left = ml + buffer;
                break;
            default:
                left = 0;
                break;
        }

        // min 5px Abstand zum Rand
        if (left < 0) left = edgeBuffer;
        else if (left >= max) left = max - edgeBuffer;

        return left;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [anchor, card, pos.x, props.open]);
    const top = React.useMemo<number | undefined>(() => {
        if (!anchor || !card || !props.open) return undefined;

        const cardRect = card.rect();
        const anchorRect = anchor.rect();
        const { mt, mb } = getMargins(anchorRect);
        const max = window.innerHeight - cardRect.height - buffer;
        let y = pos.y || "bottom";
        let top: number;

        if (y === "bottom" && mb < cardRect.height && mb < mt) y = "top";
        else if (y === "top" && mt < cardRect.height && mt < mb) y = "bottom";

        switch (y) {
            case "top":
                top = anchorRect.y - cardRect.height - buffer;
                break;
            case "bottom":
                top = anchorRect.y + anchorRect.height + buffer;
                break;
            case "center":
                top = anchorRect.y + anchorRect.height / 2 - (cardRect.height || 0) / 2;
                break;
            default:
                top = 0;
                break;
        }

        if (top < 0) top = edgeBuffer;
        else if (top >= max) top = max - edgeBuffer;

        return top;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [anchor, card, pos.y, props.open]);

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
                    width: props.cardWidth || (props.matchAnchorWidth ? props.anchor?.clientWidth : undefined),
                    minWidth: props.matchAnchorMinWidth ? props.anchor?.clientWidth : undefined,
                    visibility: left === undefined || top === undefined ? "hidden" : undefined,
                    left,
                    top,
                    ...props.slotProps?.card?.style,
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
