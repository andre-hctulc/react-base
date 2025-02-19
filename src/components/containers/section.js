import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { tv } from "tailwind-variants";
import { Subtitle } from "../text";
import { Icon } from "../icons";
import { Button, IconButton } from "../input";
import { PencilIcon } from "../icons/pencil";
import clsx from "clsx";
import { Placeholder } from "../data-display";
import { Spinner } from "../data-display/spinner";
import React from "react";
import { withPrefix } from "../../util/system";
const section = tv({
    base: "py-4 box-border",
    variants: {
        padding: {
            none: "",
            sm: "px-3 py-2.5",
            md: "py-5 px-6",
            lg: "py-8 px-8",
        },
        margin: {
            none: "",
            sm: "my-4",
            md: "my-8",
            lg: "my-12",
        },
        variant: {
            plain: "",
            outlined: "border rounded-md",
            danger: "border-[0.5px] border-error rounded-md bg-error/5",
            elevated: "bg-paper2 rounded-md",
        },
        first: {
            true: "mt-0!",
        },
        bg: {
            "1": "bg-paper1",
            "2": "bg-paper2",
            "3": "bg-paper3",
            "4": "bg-paper4",
        },
        shadow: {
            none: "",
            sm: "shadow-xs",
            base: "shadow-sm",
            md: "shadow-md",
            lg: "shadow-lg",
            xl: "shadow-xl",
        },
        flex: {
            col: "flex flex-col",
            row: "flex",
        },
    },
    defaultVariants: {
        variant: "outlined",
        margin: "md",
        padding: "md",
    },
});
/**
 * ### Props
 * - `title` - The title of the section
 * - `icon` - The icon to display next to the title
 * - `loading` - Show a loading spinner
 * - `first` - Remove top margin
 */
export const Section = React.forwardRef(({ children, className, margin, variant, padding, title, titleProps, icon, iconProps, loading, first, bg, flex, ...props }, ref) => {
    const isDanger = variant === "danger";
    return (_jsxs("section", { ref: ref, className: section({ className, margin, variant, padding, first, bg, flex }), ...props, children: [loading && (_jsx(Placeholder, { my: "md", children: _jsx(Spinner, { size: "2xl" }) })), (title || icon) && !loading && (_jsxs("div", { className: "flex gap-3 items-center pb-5", children: [icon && (_jsx(Icon, { color: isDanger ? "error" : "neutral", ...iconProps, children: icon })), _jsx(Subtitle, { variant: "h3", ...titleProps, className: clsx(isDanger && "text-error", titleProps?.className), children: title })] })), !loading && children] }));
});
const sectionFooter = tv({
    base: "mt-auto p-2 pt-4",
    variants: {
        variant: {
            actions: "flex justify-end",
            default: "",
            flex: "flex",
        },
    },
    defaultVariants: {},
});
Section.displayName = withPrefix("Section");
export const SectionFooter = ({ children, className, actions, editable, editDisabled, onEditClick, editIcon, editLoading, editButtonProps, variant, ...props }) => {
    return (_jsxs("div", { className: sectionFooter({ className, variant }), ...props, children: [children, (actions || editable) && (_jsxs("div", { className: "ml-auto pl-3", children: [actions, editable && (_jsx(IconButton, { color: "primary", loading: editLoading, disabled: editDisabled, onClick: onEditClick, variant: "text", ...editButtonProps, className: clsx("ml-4", editButtonProps?.className), children: editIcon || _jsx(PencilIcon, {}) }))] }))] }));
};
