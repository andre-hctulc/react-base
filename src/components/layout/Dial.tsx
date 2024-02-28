"use client";

import clsx from "clsx";
import React from "react";
import { CubicBezierControllPoints, cubicBezier } from "../../util";
import type { Size } from "../../types";
import { alignClass, collapse } from "../../util";

export interface DialItemProps<T extends Element = Element> {
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<T>;
    /** Forwarded when `Dial.forwardDist=true` */
    dist?: number;
    /**
     * _Scale Factor_
     *
     * Forwarded when `Dial.forwardScale=true`
     * */
    scale?: number;
}

interface DialProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactElement<DialItemProps>[];
    loading?: boolean;
    vertical?: boolean;
    /**
     * Size of the children.
     * Use _undefined_ for custom handling via `forwardDist` and `forwardScale`
     */
    itemSize: { height: number | undefined; width: number | undefined };
    /** @default "medium" */
    spacing?: Size;
    /**
     * Shrink span
     *
     * `0 < maxItemShrink < 1`
     *
     * Only active, when `scale` is not defined
     *
     * @default 0.5
     * */
    maxItemShrink?: number;
    /**
     * Up to this distance (An item's distance to the active item) children get shrinked
     *
     * @default 10
     * */
    maxShrinkDist?: number;
    scale?: CubicBezierControllPoints;
    scrollOptions?: ScrollIntoViewOptions;
    /** Key vom aktiven Element  */
    defaultActive?: React.Key;
    /** Forward `dist` prop to items (`DialItemProps`) */
    forwardDist?: boolean;
    /** Forward `scale` prop to items (`DialItemProps`) */
    forwardScale?: boolean;
    /** @default "center" */
    align?: "center" | "start" | "end";
    /** @default "div" */
    tag?: string;
}

const defaultScale: CubicBezierControllPoints = [0.17, 0.86, 0.75, 0.89];

export default function Dial(props: DialProps) {
    const controllPoints = props.scale || defaultScale;
    const maxShrinkDist = props.maxShrinkDist || 10;
    const maxItemShrink = props.maxItemShrink || 0.5;
    const vert = !!props.vertical;
    const w = props.itemSize.width;
    const h = props.itemSize.height;
    const [active, setActive] = React.useState<React.Key>(props.defaultActive || (props.children?.[0]?.key == null ? "" : props.children[0]?.key));
    const _activeIndex = props.children?.findIndex(value => value.key === active);
    const activeIndex = !_activeIndex || _activeIndex === -1 ? 0 : _activeIndex;
    /** Skalierte Größen memorisieren, statt bei jedem render zu berechnen */
    const shrinkedSizes = React.useMemo<Map<number | null, { height: number | undefined; width: number | undefined; scale: number }> | null>(() => {
        const result = new Map<number | null, { height: number | undefined; width: number | undefined; scale: number }>();

        /** Die Länge auf der X-Achse die einer Distanz von 1 entspricht */
        const xTick = 1 / maxShrinkDist;

        // `maxShrinkDist` darf nicht sehr groß!
        for (let dist = 1; dist <= maxShrinkDist; dist++) {
            const shrinkScaleFactor = cubicBezier(dist * xTick, controllPoints);
            /** `0 <= scale <= 1`. */
            const scale = 1 - shrinkScaleFactor * maxItemShrink;
            // TODO round?
            const sizeAndScale = {
                height: h === undefined ? undefined : Math.round(h * scale),
                width: w === undefined ? w : Math.round(w * scale),
                scale: Math.round(scale * 100) / 100,
            };

            result.set(dist, sizeAndScale);
            // Für Items, die nicht explizit berechnte wurden, also alle Items mit dist>maxShrinkDist
            if (dist === maxShrinkDist) result.set(null, sizeAndScale);
        }

        return result;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [w, h, maxItemShrink, maxShrinkDist, ...controllPoints]);
    const children = React.Children.map(props.children, (child, i) => {
        if (!child) return null;

        const dist = Math.abs(activeIndex - i);
        const isActive = dist === 0;
        let height = h;
        let width = w;
        let scale: number = 1;

        if (!isActive) {
            const scaled = shrinkedSizes?.get(dist > maxShrinkDist ? null : dist);

            if (scaled) {
                width = scaled.width;
                height = scaled.height;
                scale = scaled.scale;
            }
        }

        const itemProps: DialItemProps = {
            className: clsx("transition-all duration-200", child?.props.className),
            style: { ...child?.props.style, height, width },
            onClick: (e: React.MouseEvent<HTMLElement>) => {
                // Item aktivieren
                setActive(child.key == null ? "" : child.key);
                e.currentTarget?.scrollIntoView(props.scrollOptions || { behavior: "smooth", block: "center", inline: "center" });
                child.props.onClick?.(e);
            },
        };

        if (props.forwardDist) itemProps.dist = dist;
        if (props.forwardScale) itemProps.scale = scale;

        return React.cloneElement(child, {
            ...child?.props,
            ...itemProps,
        });
    });
    const [spacing, spacingVert] = collapse(
        props.spacing || "medium",
        {
            small: ["space-x-2", "space-y-2"],
            medium: ["space-x-4", "space-y-4"],
            large: ["space-x-6", "space-y-6"],
        },
        []
    );
    const align = alignClass(props.align || "center");
    const Comp: any = props.tag || "div";
    // Listen düren nur li-Elemente enthalten
    const PlaceholderComp = Comp === "ol" || Comp === "ul" ? "li" : "div";

    return (
        <Comp
            className={clsx("flex", align, vert ? ["flex-col overflow-y-auto", spacingVert] : ["flex-row overflow-x-auto", spacing], props.className)}
            style={{ ...props.style }}
        >
            {children}
            {/* Dummy Element, um die Höhe der root konstant zu halten. Durch height transition schwankt die Höhe beim ändern des aktiven Elementes */}
            {!!children?.length && (
                <PlaceholderComp className="!m-0" style={{ height: vert ? undefined : h, width: vert ? w : undefined, visibility: "hidden" }} />
            )}
        </Comp>
    );
}
