import { tv } from "tailwind-variants";
import type { ELEMENT, PropsOf, RichAsProps, WithTVProps } from "../../types/index.js";
import clsx from "clsx";

const divider = tv({
    base: "flex items-center shrink-0",
    variants: {
        my: {
            none: "",
            "2xs": "my-1",
            xs: "my-2",
            sm: "my-4",
            md: "my-8",
            lg: "my-12",
            xl: "my-20",
        },
        fullWidth: {
            true: "w-full",
        },
    },
    defaultVariants: {},
});

type DividerProps<T extends ELEMENT = "div"> = WithTVProps<
    RichAsProps<T> & {
        mainProps?: PropsOf<"div">;
        dark?: boolean;
        hrProps?: PropsOf<"hr">;
    },
    typeof divider
>;

export const Divider = <T extends ELEMENT = "div">({
    children,
    className,
    as,
    mainProps,
    my,
    fullWidth,
    hrProps,
    dark,
    ...props
}: DividerProps<T>) => {
    const Comp: any = as || "div";
    const hrClasses = clsx("grow", dark && "border-divider-dark");

    return (
        <Comp className={divider({ className, my, fullWidth })} {...props}>
            <hr {...hrProps} className={hrClasses} />
            {!!children && (
                <div {...mainProps} className={clsx("px-4", mainProps?.className)}>
                    {children}
                </div>
            )}
            <hr {...hrProps} className={hrClasses} />
        </Comp>
    );
};
