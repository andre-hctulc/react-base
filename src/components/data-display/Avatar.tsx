import React from "react";
import Skeleton from "../feedback/Skeleton";
import type { StyleProps } from "../../types";
import clsx from "clsx";

interface AvatarProps extends StyleProps {
    size?: number;
    children?: React.ReactNode;
    src?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    alt?: string;
    loading?: boolean;
}

export const avatarSizeMap = { xsmall: 25, small: 32, medium: 42, large: 55, xlarge: 70 };

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
    if (props.loading) return <Skeleton onClick={props.onClick} ref={ref} variant="circular" />;

    return (
        <div
            ref={ref}
            className={clsx(
                "inline-flex flex-col justify-center items-center rounded-full bg-bg-dark/40 p-1 flex-shrink-0 overflow-hidden transition duration-300",
                props.className
            )}
            onClick={props.onClick}
        >
            {props.src ? (
                <img
                    height={props.size}
                    width={props.size}
                    style={{
                        /* Irgendwer setzt css rule: img, media { maxWidth: 100% } */ maxWidth: "unset",
                    }}
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
