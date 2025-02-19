import { jsx as _jsx } from "react/jsx-runtime";
import { Transition } from "@headlessui/react";
export const Fade = (props) => {
    return (_jsx(Transition, { enter: "transition-opacity duration-300", enterFrom: "opacity-0", enterTo: "opacity-100", leave: "transition-opacity duration-300", leaveFrom: "opacity-100", leaveTo: "opacity-0", ...props, children: props.children }));
};
