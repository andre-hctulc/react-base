import React from "react";
import { ImageComponentProps, StyleProps, XDynamicSize } from "../../types";
import { getSize, styleProps } from "../../util";
import Skeleton from "../feedback/Skeleton";

interface AvatarProps extends StyleProps {
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
        return (
            <Skeleton
                onClick={props.onClick}
                ref={ref}
                variant="circular"
                {...styleProps({ style: { height: size, width: size } }, props)}
            />
        );

    const Image = props.imageCompoent || "img";

    return (
        <div
            ref={ref}
            {...styleProps(
                {
                    style: { height: size, width: size },
                    className:
                        "inline-flex flex-col justify-center items-center rounded-full bg-bg-dark/40 p-1 flex-shrink-0 overflow-hidden transition duration-300",
                },
                props
            )}
            onClick={props.onClick}
        >
            {props.src ? (
                <Image
                    height={size}
                    width={size}
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
