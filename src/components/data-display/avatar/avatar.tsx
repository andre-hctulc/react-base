// * SSR

import clsx from "clsx";
import Skeleton from "../loading/skeleton";
import React from "react";
import Image from "next/image";
import { DynamicSize } from "@react-client/types";
import { getSize } from "@react-client/util";

interface AvatarProps {
    className?: string;
    style?: React.CSSProperties;
    size?: DynamicSize;
    children?: React.ReactNode;
    src?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    alt?: string;
    loading?: boolean;
}

export const avatarSizeMap = { small: 25, medium: 32, large: 40 };

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
    const size = getSize(avatarSizeMap, props.size || "medium");

    if (props.loading)
        return <Skeleton onClick={props.onClick} ref={ref} className={props.className} style={{ height: size, width: size, ...props.style }} variant="circular" />;

    return (
        <div
            ref={ref}
            className={clsx(
                "flex flex-col justify-center items-center rounded-full bg-bg-dark/40 p-1 flex-shrink-0 overflow-hidden transition duration-300",
                props.className
            )}
            style={{ height: size, width: size, ...props.style }}
            onClick={props.onClick}
        >
            {props.src ? (
                <Image
                    height={size}
                    width={size}
                    style={{ /* Irgendwer setzt css rule: img, media { maxWidth: 100% } */ maxWidth: "unset" }}
                    alt={props.alt || ""}
                    src={props.src}
                />
            ) : (
                props.children
            )}
        </div>
    );
});

Avatar.displayName = "Avatar";

export default Avatar;
