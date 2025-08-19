import { tv } from "tailwind-variants";
import type { ELEMENT, PartialPropsOf, RichAsProps, WithTVProps } from "../../types/index.js";
import { Children, type FC } from "react";
import { Avatar } from "./avatar.js";
import { populateProps } from "../../util/react.js";

const avatarGroup = tv({
    base: "flex items-center overflow-x-auto",
    variants: {
        gap: {
            none: "",
            xs: "-space-x-1",
            sm: "-space-x-2",
            md: "-space-x-3",
            lg: "-space-x-5",
            xl: "-space-x-8",
        },
    },
    defaultVariants: {
        gap: "md",
    },
});

type AvatarGroupProps<T extends ELEMENT = "div"> = WithTVProps<
    RichAsProps<T> & {
        max?: number;
        avatarProps?: PartialPropsOf<typeof Avatar>;
        overflowAvatarProps?: PartialPropsOf<typeof Avatar>;
        dataAvatarProps?: PartialPropsOf<typeof Avatar>;
    },
    typeof avatarGroup
>;

export const AvatarGroup: FC<AvatarGroupProps> = ({
    children,
    className,
    avatarProps,
    max,
    overflowAvatarProps,
    gap,
    dataAvatarProps,
    ...props
}) => {
    let c = Children.toArray(children);
    let overflow = 0;

    if (max && c.length > max) {
        overflow = c.length - max;
        c = c.slice(0, max);
    }

    return (
        <div className={avatarGroup({ className, gap })} {...props}>
            {!!overflow && (
                <Avatar
                    {...avatarProps}
                    {...overflowAvatarProps}
                    style={{ ...avatarProps?.style, ...overflowAvatarProps?.style, zIndex: 0 }}
                >
                    +{overflow}
                </Avatar>
            )}
            {populateProps(c, (c, index) => ({
                ...avatarProps,
                ...dataAvatarProps,
                style: {
                    ...(c.props as any)?.style,
                    ...avatarProps?.style,
                    ...dataAvatarProps?.style,
                    zIndex: -(index + 1),
                },
            }))}
        </div>
    );
};
