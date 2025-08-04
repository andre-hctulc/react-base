import { tv } from "tailwind-variants";
import type { ELEMENT, PropsOf, RichAsProps, WithTVProps } from "../../types/index.js";
import clsx from "clsx";

const divider = tv({
    base: "flex items-center",
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
    },
    defaultVariants: {},
});

type DividerProps<T extends ELEMENT> = WithTVProps<
    RichAsProps<T> & {
        mainProps?: PropsOf<"div">;
    },
    typeof divider
>;

export const Divider = <T extends ELEMENT>({
    children,
    className,
    as,
    mainProps,
    my,
    ...props
}: DividerProps<T>) => {
    const Comp: any = as || "div";

    return (
        <Comp className={divider({ className, my })} {...props}>
            <hr className="grow" />
            <div {...mainProps} className={clsx("px-4", mainProps?.className)}>
                {children}
            </div>
            <hr className="grow" />
        </Comp>
    );
};
