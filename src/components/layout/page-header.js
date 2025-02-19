import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import { tv } from "tailwind-variants";
import { Title } from "../text/title";
const pageHeader = tv({
    base: "w-full",
    variants: {
        padding: {
            none: "",
            sm: "p-2 md:p-4 pb-0 md:pb-0",
            md: "p-3.5 md:p-7 pb-0 md:pb-0",
            lg: "p-5 md:p-9 pb-0 md:pb-0",
        },
        mb: {
            none: "",
            xs: "mb-4",
            sm: "mb-8",
            md: "mb-12",
            lg: "mb-16",
            xl: "mb-20",
        },
        mt: {
            none: "",
            xs: "mt-4",
            sm: "mt-8",
            md: "mt-12",
            lg: "mt-16",
            xl: "mt-20",
        },
    },
    defaultVariants: {
        padding: "md",
    },
});
/**
 * Use this inside a {@link Page} component to display a header with title, badges and actions.
 */
export const PageHeader = ({ title, titleProps, actions, badges, pre, children, className, center, mb, padding, }) => {
    return (_jsxs("div", { className: pageHeader({ className, mb, padding }), children: [pre, (badges || actions || title) && (_jsxs("div", { className: clsx("flex gap-3 py-2", center && "justify-center"), children: [title && _jsx(Title, { ...titleProps, children: title }), badges && _jsx("div", { className: "flex gap-3", children: badges }), actions && (_jsx("div", { className: "flex flex-wrap grow items-center justify-end", children: actions }))] })), children] }));
};
