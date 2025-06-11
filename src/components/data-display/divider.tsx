import { tv } from "tailwind-variants";
import type { PropsOf, TVCProps } from "../../types/index.js";
import { type FC } from "react";
import clsx from "clsx";

const divider = tv({
    base: "flex items-center",
    variants: {},
    defaultVariants: {},
});

export interface DividerProps extends TVCProps<typeof divider, "div"> {
    as?: any;
    mainProps?: PropsOf<"div">;
}

export const Divider: FC<DividerProps> = ({ children, className, as, mainProps, ...props }) => {
    const Comp: any = as || "div";

    return (
        <Comp className={divider({ className })} {...props}>
            <hr className="grow" />
            <div {...mainProps} className={clsx("px-4", mainProps?.className)}>
                {children}
            </div>
            <hr className="grow" />
        </Comp>
    );
};
