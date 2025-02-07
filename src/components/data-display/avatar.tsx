import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types";
import { withPrefix } from "../../util/system";
import { forwardRef } from "react";

const avatar = tv({
    base: "flex items-center justify-center overflow-hidden shrink-0 aspect-square",
    variants: {
        shape: {
            circle: "rounded-full",
            square: "rounded",
        },
        bg: {
            "1": "bg-1",
            "2": "bg-2",
            "3": "bg-3",
            "4": "bg-4",
            none: "",
        },
        size: {
            sm: "size-8 text-lg",
            md: "size-10 text-xl",
            lg: "size-14 text-2xl",
            xl: "size-16 text-3xl",
            auto: "",
            none: "",
        },
        padding: {
            sm: "p-1",
            md: "p-2",
            lg: "p-3",
            xl: "p-4",
            "2xl": "p-5",
            "50%": "p-[50%]",
        },
        bold: {
            true: "font-medium",
        },
        textColor: {
            "1": "text-1",
            "2": "text-2",
            "3": "text-3",
            "4": "text-4",
        },
    },
    defaultVariants: {
        shape: "circle",
        bg: "3",
        textColor: "2",
        size: "md",
    },
});

interface AvatarProps extends TVCProps<typeof avatar, "div"> {
    src?: string;
    as?: any;
    alt?: string;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
    ({ src, alt, className, size, shape, padding, children, as, bold, textColor, ...props }, ref) => {
        const Comp: any = as || "div";

        return (
            <Comp
                ref={ref}
                className={avatar({ size, shape, padding, className, textColor, bold })}
                {...props}
            >
                {children}
            </Comp>
        );
    }
);

Avatar.displayName = withPrefix("Avatar");
