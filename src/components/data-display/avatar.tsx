import { tv } from "tailwind-variants";
import type { TVCProps, XStyleProps } from "../../types";
import React from "react";
import { withPrefix } from "../../util/system";

const avatar = tv({
    base: "flex items-center justify-center overflow-hidden",
    variants: {
        shape: {
            circle: "rounded-full",
            square: "rounded",
        },
        size: {
            sm: "size-8 text-xs",
            md: "size-12 text-sm",
            lg: "size-16 text-base",
            xl: "size-20 text-lg",
            "2xl": "size-24 text-xl",
        },
    },
    defaultVariants: {
        shape: "circle",
        size: "md",
    },
});

interface AvatarProps extends TVCProps<typeof avatar, "div"> {
    src?: string;
    alt?: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
    ({ src, alt, className, size, shape, ...props }, ref) => {
        return (
            <div ref={ref} className={avatar({ size, shape, className })} {...props}>
                <img src={src} alt={alt || "Avatar"} />
            </div>
        );
    }
);

Avatar.displayName = withPrefix("Avatar");
