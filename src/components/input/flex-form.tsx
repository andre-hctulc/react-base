import { tv, type ClassValue } from "tailwind-variants";
import type { TVCProps } from "../../types/index.js";

const flexForm = tv({
    base: "flex",
    variants: {
        direction: {
            row: "flex-row",
            col: "flex-col",
            wrap: "flex flex-wrap",
        },
        gap: {
            sm: "gap-2",
            md: "gap-3.5",
            lg: "gap-6",
            xl: "gap-9",
            none: "",
        },
    },
    defaultVariants: {
        direction: "col",
    },
});

interface FlexFormProps extends Omit<TVCProps<typeof flexForm, "form">, "className"> {
    children?: React.ReactNode;
    className?: ClassValue;
}

/**
 * Use `formEventToFormData` or `formEventToValues` to convert form event to values.
 */
export const FlexForm: React.FC<FlexFormProps> = ({ children, direction, className, gap, ...props }) => {
    return (
        <form className={flexForm({ direction, className, gap })} {...props}>
            {children}
        </form>
    );
};
