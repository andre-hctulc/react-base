import { tv } from "tailwind-variants";
import { type FC } from "react";
import type { ELEMENT, PropsOf, RichAsProps, WithTVProps } from "../../types/index.js";

const label = tv({
    base: "inline-block",
    variants: {
        variant: {
            default: "text-base",
            secondary: "text-t2 text-sm",
            tertiary: "text-t3 text-xs",
        },
        mb: {
            none: "mb-0",
            sm: "mb-1",
            md: "mb-2",
            lg: "mb-3",
            xl: "mb-5",
        },
        mt: {
            none: "mt-0",
            sm: "mt-1",
            md: "mt-2",
            lg: "mt-3",
            xl: "mt-5",
        },
        my: {
            none: "my-0",
            sm: "my-1",
            md: "my-2",
            lg: "my-3",
            xl: "my-5",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

type LabelProps<T extends ELEMENT = "label"> = WithTVProps<
    RichAsProps<T> & {
        requiredHint?: boolean;
    },
    typeof label
>;

export const Label = <T extends ELEMENT = "label">({
    children,
    className,
    requiredHint,
    mb,
    mt,
    my,
    as,
    variant,
    ref,
    ...props
}: LabelProps<T>) => {
    const Comp: any = as || "label";
    const p = { ...props };

    if (as && as !== "label") {
        delete p.htmlFor;
    }

    return (
        <Comp ref={ref as any} className={label({ className, mb, mt, my, variant })} {...p}>
            {children}
            {requiredHint && <span>{" *"}</span>}
        </Comp>
    );
};
