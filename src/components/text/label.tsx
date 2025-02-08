import { tv } from "tailwind-variants";
import { withPrefix } from "../../util/system";
import type { TVCProps } from "../../types";
import { forwardRef } from "react";

const label = tv({
    base: "inline-block",
    variants: {
        variant: {
            default: "text-base",
            secondary: "text-2 text-sm",
            tertiary: "text-3 text-xs",
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

interface LabelProps extends TVCProps<typeof label, "label"> {
    requiredHint?: boolean;
    as?: any;
}

export const Label = forwardRef<HTMLElement, LabelProps>(
    ({ children, className, requiredHint, mb, mt, my, as, variant, ...props }, ref) => {
        const Comp = as || "label";
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
    }
);

Label.displayName = withPrefix("Label");
