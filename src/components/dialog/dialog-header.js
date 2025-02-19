"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from "../icons";
import { IconButton } from "../input";
import { tv } from "tailwind-variants";
import { Title } from "../text";
const dialogHeader = tv({
    base: "flex items-center px-6 pt-5 pb-4 gap-2 box-border",
    variants: {},
    defaultVariants: {},
});
export const DialogHeader = ({ title, className, onClose, closeIcon, icon, iconProps, titleProps, actions, ...props }) => {
    return (_jsxs("div", { className: dialogHeader({ className }), style: props.style, children: [icon && (_jsx(Icon, { size: "lg", ...iconProps, children: icon })), (!!actions || !!title) && (_jsxs("div", { children: [typeof title === "string" ? (_jsx(Title, { bold: false, variant: "h3", ...titleProps, children: title })) : (title), actions && _jsx("div", { className: "ml-auto", children: actions })] })), onClose && (_jsx(IconButton, { onClick: () => onClose(), variant: "text", color: "neutral", className: "ml-auto", children: closeIcon || "×" }))] }));
};
