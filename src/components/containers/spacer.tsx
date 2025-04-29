import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types/index.js";

const spacer = tv({
    base: "flex",
    variants: {
        variant: {
            row: "",
            col: "flex-col",
        },
        wrap: {
            true: "flex-wrap",
        },
        spacing: {
            "2xs": "gap-0.5",
            xs: "gap-1",
            sm: "gap-2",
            md: "gap-4",
            lg: "gap-6",
            xl: "gap-8",
            "2xl": "gap-10",
            "3xl": "gap-12",
            "4xl": "gap-16",
            "5xl": "gap-20",
        },
    },
    defaultVariants: {
        spacing: "md",
    },
});

interface SpacerProps extends TVCProps<typeof spacer, "div"> {
    as?: any;
}

/**
 * Flex container. Creates gap between elements.
 *
 * ### Props
 * - `wrap`
 * - `spacing`
 * - `variant`
 * - `as`
 */
export const Spacer = ({ className, spacing, variant, wrap, as, ...props }: SpacerProps) => {
    const Comp = as || "div";
    return <Comp className={spacer({ className, spacing, variant, wrap })} {...props} />;
};
