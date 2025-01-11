import { Transition } from "@headlessui/react";
import type { PropsOf } from "../../types";

interface FadeProps extends PropsOf<typeof Transition> {}

export const Fade: React.FC<FadeProps> = (props) => {
    return (
        <Transition
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            {...props}
        >
            {props.children}
        </Transition>
    );
};
