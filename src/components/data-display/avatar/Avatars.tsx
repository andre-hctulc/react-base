import clsx from "clsx";
import React from "react";
import type { PropsOf, XDynamicSize } from "../../../types";
import { collapse, justifyClass } from "../../../util";
import Avatar from "./Avatar";
import Skeleton from "../../feedback/Skeleton";

type ForwardedAvataProps = Pick<PropsOf<typeof Avatar>, "size">;

interface AvatarsProps {
    className?: string;
    style?: React.CSSProperties;
    max?: number;
    children: React.ReactElement<ForwardedAvataProps>[] | null | undefined;
    loading?: boolean;
    justify?: "start" | "center" | "end";
    slotProps?: { skeleton?: PropsOf<typeof Skeleton> };
    size?: XDynamicSize;
    /** @default 3 */
    loadingCount?: number;
    /** @default "medium" */
}

export default function Avatars(props: AvatarsProps) {
    const loading = props.loading ?? !props.children;
    const avatarProps: ForwardedAvataProps = { size: props.size };
    const diff = props.max && props.children ? Math.max(0, props.children.length - props.max) : 0;
    const spacing = collapse(typeof props.size === "number" ? "medium" : props.size || "medium", {
        xsmall: "-space-x-3",
        small: "-space-x-3",
        medium: "-space-x-4",
        large: "-space-x-5",
        xlarge: "-space-x-6",
    });

    return (
        <div className={clsx("Avatars flex", spacing, props.justify && justifyClass(props.justify), props.className)} style={props.style}>
            {loading && (
                <Skeleton className="flex" {...props.slotProps?.skeleton}>
                    {Array.from({ length: typeof props.loadingCount === "number" ? props.loadingCount : 3 }, i => (
                        <Avatar key={`loading-avatar-${i}`} {...avatarProps} size={props.size}>
                            diff
                        </Avatar>
                    ))}
                </Skeleton>
            )}
            {props.children?.map(avatar => React.cloneElement<PropsOf<typeof Avatar>>(avatar, { ...avatar.props, ...avatarProps }))}
            {!!diff && (
                <Avatar {...avatarProps} size={props.size}>
                    diff
                </Avatar>
            )}
        </div>
    );
}
