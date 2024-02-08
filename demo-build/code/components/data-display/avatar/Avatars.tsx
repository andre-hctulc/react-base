import clsx from "clsx";
import React from "react";
import Skeleton from "../feedback/Skeleton";
import Avatar from "./Avatar";
import { firstBool, range } from "u/src/iterables";
import { collapse } from "u/src/helpers";
import { DynamicSize, PropsOf, XSize } from "../../../types";

type ForwardedAvataProps = Pick<PropsOf<typeof Avatar>, "size">;

interface AvatarsProps {
    className?: string;
    style?: React.CSSProperties;
    max?: number;
    children: React.ReactElement<ForwardedAvataProps>[] | null | undefined;
    loading?: boolean;
    justifyEnd?: boolean;
    slotProps?: { skeleton?: PropsOf<typeof Skeleton> };
    size?: DynamicSize;
    /** @default 3 */
    loadingCount?: number;
    /** @default "medium" */
    spacing?: XSize;
}

/**
 * Ein Ladezustand wird angezeigt, falls die children _null_ oder _undefined_ sind. Falls `loading` angegeben ist, wird dieser Wert benutzt, um den Ladezustand zu steuern.
 * @css
 *  */
export default function Avatars(props: AvatarsProps) {
    const spacing = collapse(props.spacing || "medium", {
        xsmall: "-space-x-1",
        small: "-space-x-2.5",
        medium: "-space-x-4",
        large: "-space-x-7",
        xlarge: "-space-x-12",
    });
    const loading = firstBool(props.loading, !props.children);
    const avatarProps: ForwardedAvataProps = { size: props.size };
    const diff = props.max && props.children ? Math.max(0, props.children.length - props.max) : 0;

    return (
        <div className={clsx("Avatars flex", spacing, props.justifyEnd && "justify-end", props.className)} style={props.style}>
            {loading && (
                <Skeleton className="flex" {...props.slotProps?.skeleton}>
                    {range(typeof props.loadingCount === "number" ? props.loadingCount : 3, i => (
                        <Avatar key={`loading-avatar-${i}`} {...avatarProps}>
                            diff
                        </Avatar>
                    ))}
                </Skeleton>
            )}
            {props.children?.map(avatar => React.cloneElement<PropsOf<typeof Avatar>>(avatar, { ...avatar.props, ...avatarProps }))}
            {!!diff && <Avatar {...avatarProps}>diff</Avatar>}
        </div>
    );
}
