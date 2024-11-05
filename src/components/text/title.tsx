import clsx from "clsx";
import React from "react";
import { withPrefix } from "../../util/system";

interface TitleProps extends React.ComponentPropsWithoutRef<"h2"> {
    as?: any;
}

export const Title = React.forwardRef<HTMLElement, TitleProps>(
    ({ children, className, as, ...props }, ref) => {
        const Comp = as || "h1";

        return (
            <Comp className={clsx("text-xl font-semibold", className)} ref={ref as any} {...props}>
                {children}
            </Comp>
        );
    }
);

Title.displayName = withPrefix("Title");
