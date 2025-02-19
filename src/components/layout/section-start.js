import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Subtitle } from "../text";
import { tv } from "tailwind-variants";
import { Icon } from "../icons";
const sectionStart = tv({
    base: "flex flex-col",
    variants: {
        mt: {
            xs: "mt-1",
            sm: "mt-3",
            md: "mt-5",
            lg: "mt-8",
            none: "",
        },
        mb: {
            xs: "mb-1",
            sm: "mb-3",
            md: "mb-5",
            lg: "mb-8",
            none: "",
        },
        my: {
            xs: "my-1",
            sm: "my-3",
            md: "my-5",
            lg: "my-8",
            none: "",
        },
        contrast: {
            true: "bg-paper2 px-3 py-1.5 rounded-xs",
        },
    },
    defaultVariants: {
        my: "md",
    },
});
/**
 * ### Props
 * - `title` - Section title
 * - `mt` - Margin top
 * - `mb` - Margin bottom
 */
export const SectionStart = ({ children, className, mt, mb, my, title, icon, iconProps, variant, contrast, ...props }) => {
    const defaultVariant = variant === "default" || !variant;
    return (_jsxs("div", { className: sectionStart({ className, mt, mb, my, contrast }), ...props, children: [(title || icon) && (_jsxs("div", { className: "flex items-center gap-2.5", children: [icon && (_jsx(Icon, { size: defaultVariant ? "md" : "sm", ...iconProps, children: icon })), _jsx(Subtitle, { variant: defaultVariant ? "h2" : "h3", children: title })] })), children] }));
};
