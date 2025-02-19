"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useMemo } from "react";
import { Card, CardBody } from "../../containers";
import { Popover } from "../../dialog/popover";
import { IconButton, Select } from "../../input";
import { GearIcon } from "../../icons/gear";
import { Subtitle } from "../../text";
export const DataGridSettings = ({ icon, cols, hiddenCols, onChange }) => {
    const btn = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const colOptions = useMemo(() => {
        return cols
            .filter((col) => col.hidable !== false)
            .map((col) => ({ label: col.label, value: col.path, data: col }));
    }, [cols]);
    const shownCols = useMemo(() => {
        const hiddenSet = new Set(hiddenCols);
        return cols.filter((col) => !hiddenSet.has(col.path)).map((col) => col.path);
    }, [cols, hiddenCols]);
    return (_jsxs(_Fragment, { children: [_jsx(IconButton, { ref: btn, size: "sm", color: "neutral", variant: "text", onClick: (e) => {
                    e.stopPropagation();
                    setOpen(true);
                }, children: icon || _jsx(GearIcon, {}) }), _jsx(Popover, { anchor: btn.current, open: open, onClose: () => {
                    setOpen(false);
                }, zIndex: "20", position: "left-start", children: _jsx(Card, { width: "sm", onClick: (e) => {
                        console.log("test");
                    }, children: _jsxs(CardBody, { children: [_jsx(Subtitle, { mb: "sm", variant: "h3", children: "Columns" }), _jsx(Select, { placeholder: "Select columns to show", multiple: true, options: colOptions, value: shownCols, onChange: ({ value }) => {
                                    const shownSet = new Set(value);
                                    onChange?.(cols
                                        .filter((col) => !shownSet.has(col.path) && col.hidable !== false)
                                        .map((col) => col.path));
                                } })] }) }) })] }));
};
