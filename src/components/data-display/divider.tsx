import { tv } from "tailwind-variants";
import type { PropsOf, TVCProps } from "../../types/index.js";
import { type FC } from "react";
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

export interface DividerProps extends TVCProps<typeof divider, "div"> {
    as?: any;
    mainProps?: PropsOf<"div">;
}

export const Divider: FC<DividerProps> = ({ children, className, as, mainProps, my, ...props }) => {
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
