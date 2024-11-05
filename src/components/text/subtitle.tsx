import clsx from "clsx";
import { withPrefix } from "../../util/system";
import React from "react";

interface SubtitleProps extends React.ComponentPropsWithoutRef<"h2"> {
    as?: any;
}

export const Subtitle = React.forwardRef<HTMLElement, SubtitleProps>(
    ({ children, className, as, ...props }, ref) => {
        const Comp = as || "h2";

        return (
            <Comp
                className={clsx("text-lg font-semibold text-gray-500", className)}
                ref={ref as any}
                {...props}
            >
                {children}
            </Comp>
        );
    }
);

Subtitle.displayName = withPrefix("Subtitle");
