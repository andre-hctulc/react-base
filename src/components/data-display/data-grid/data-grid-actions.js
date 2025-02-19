"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Popover } from "../../dialog/popover";
import { IconButton } from "../../input";
import { MoreVertIcon } from "../../icons/more-vert";
export const DataGridActions = ({ row, moreIcon, render }) => {
    const [open, setOpen] = React.useState(false);
    const btn = React.useRef(null);
    return (_jsxs(_Fragment, { children: [_jsx(IconButton, { size: "sm", color: "neutral", variant: "text", onClick: (e) => {
                    e.stopPropagation();
                    setOpen(true);
                }, ref: btn, children: moreIcon || _jsx(MoreVertIcon, {}) }), _jsx(Popover, { anchor: btn.current, open: open, onClose: () => setOpen(false), zIndex: "10", position: "bottom-end", children: render ? render(row) : _jsx("i", { className: "text-t2 text-sm px-4 py-2", children: "No actions" }) })] }));
};
