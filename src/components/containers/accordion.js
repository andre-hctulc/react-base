import { jsx as _jsx } from "react/jsx-runtime";
import { tv } from "tailwind-variants";
const accordion = tv({});
export const Accordion = ({ children, className, ...props }) => {
    return (_jsx("div", { className: accordion({ className }), ...props, children: children }));
};
