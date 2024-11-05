import { Transition } from "@headlessui/react";
import type { PropsOf } from "../../types";

interface CollapseProps extends PropsOf<typeof Transition> {}

export const Collapse: React.FC<CollapseProps> = (props) => {
    return (
        <Transition
            enter="transition-height duration-300"
            enterFrom="h-0"
            enterTo="h-auto"
            leave="transition-height duration-300"
            leaveFrom="h-auto"
            leaveTo="h-0"
            {...props}
        >
            {props.children}
        </Transition>
    );
};
