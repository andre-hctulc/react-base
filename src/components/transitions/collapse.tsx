import { Transition } from "@headlessui/react";
import type { PropsOf } from "../../types";

interface CollapseVProps extends PropsOf<typeof Transition> {}

export const CollapseV: React.FC<CollapseVProps> = (props) => {
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

interface CollapseHProps extends PropsOf<typeof Transition> {}

export const CollapseH: React.FC<CollapseHProps> = (props) => {
    return (
        <Transition
            enter="transition-width duration-300"
            enterFrom="w-0"
            enterTo="w-auto"
            leave="transition-width duration-300"
            leaveFrom="w-auto"
            leaveTo="w-0"
            {...props}
        >
            {props.children}
        </Transition>
    );
};
