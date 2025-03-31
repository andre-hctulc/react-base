import { tv } from "tailwind-variants";
import type { TVCProps, StyleProps } from "../../types/index.js";
import { withPrefix } from "../../util/system.js";
import React, { type FC } from "react";

const stat = tv({
    variants: {
        size: {
            sm: "text-sm",
            md: "text-base",
            lg: "text-lg",
        },
    },
    defaultVariants: { size: "md" },
});

interface StatProps extends Omit<TVCProps<typeof stat, "div">, "children"> {
    value?: any;
    unit?: string;
    prefix?: string;
    suffix?: string;
}

export const Stat: FC<StatProps> = ({ className, size, value, prefix, suffix, unit, ref, ...props }) => {
    return (
        <div className={stat({ className, size })} ref={ref} {...props}>
            {prefix}
            {value + " "}
            {unit && <span className="text-xs text-t2">{unit}</span>}
            {suffix}
        </div>
    );
};
