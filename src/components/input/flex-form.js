import { jsx as _jsx } from "react/jsx-runtime";
import { tv } from "tailwind-variants";
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
/**
 * Use `formEventToFormData` or `formEventToValues` to convert form event to values.
 */
export const FlexForm = ({ children, direction, className, gap, ...props }) => {
    return (_jsx("form", { className: flexForm({ direction, className, gap }), ...props, children: children }));
};
