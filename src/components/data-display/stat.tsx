import { tv } from "tailwind-variants";
import type { TVCProps, StyleProps } from "../../types";
import { withPrefix } from "../../util/system";
import React from "react";

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

export const Stat = React.forwardRef<HTMLDivElement, StatProps>(
    ({ className, size, value, prefix, suffix, unit, ...props }, ref) => {
        return (
            <div className={stat({ className, size })} ref={ref} {...props}>
                {prefix}
                {value + " "}
                {unit && <span className="text-xs text-t2">{unit}</span>}
                {suffix}
            </div>
        );
    }
);

Stat.displayName = withPrefix("Stat");
