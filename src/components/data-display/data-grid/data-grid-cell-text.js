import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
export const DataGridCellText = ({ children, style, className }) => {
    return (_jsx("span", { className: clsx("inline-block py-2 truncate font-light align-middle max-w-full", className), style: style, children: children === undefined ? "" : String(children) }));
};
