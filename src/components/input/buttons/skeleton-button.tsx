"use client";

import Skeleton from "@react-client/components/data-display/loading/skeleton";
import PlusIcon from "@react-client/components/icons/collection/plus";
import { DynamicSize } from "@react-client/types";
import clsx from "clsx";

interface SkeletonButtonProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: React.ReactNode;
    text?: string;
    width?: number;
    height?: number;
    plusIconSize?: DynamicSize;
    thickBorder?: boolean;
}

export default function SkeletonButton(props: SkeletonButtonProps) {
    const classes = clsx(
        "border border-dashed relative rounded-lg hover:bg-action-hover active:bg-action-active border-box",
        props.thickBorder && "border-2",
        !props.children && "p-3",
        props.className
    );

    return (
        <button onClick={props.onClick} className={classes} style={{ width: props.width, height: props.height, ...props.style }}>
            {props.children && <Skeleton pulse={false}>{props.children}</Skeleton>}
            <div className="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center">
                <PlusIcon disabled size={props.plusIconSize || 40} />
            </div>
        </button>
    );
}
