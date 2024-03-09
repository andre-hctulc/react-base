import clsx from "clsx";
import React from "react";
import { ImageComponentProps, XDynamicSize } from "../../../types";
import { getSize } from "../../../util";
import Skeleton from "../../feedback/Skeleton";

interface AvatarProps {
    className?: string;
    style?: React.CSSProperties;
    size?: XDynamicSize;
    children?: React.ReactNode;
    src?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    alt?: string;
    loading?: boolean;
    imageCompoent?: React.ComponentType<ImageComponentProps>;
}

export const avatarSizeMap = { xsmall: 25, small: 32, medium: 42, large: 55, xlarge: 70 };

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
    const size = getSize(props.size || "medium", avatarSizeMap);

    if (props.loading)
        return <Skeleton onClick={props.onClick} ref={ref} className={props.className} style={{ height: size, width: size, ...props.style }} variant="circular" />;

    const Image = props.imageCompoent || "img";

    return (
        <div
            ref={ref}
            className={clsx(
                "inline-flex flex-col justify-center items-center rounded-full bg-bg-dark/40 p-1 flex-shrink-0 overflow-hidden transition duration-300",
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
