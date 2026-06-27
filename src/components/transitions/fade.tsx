import type { PropsOf } from "../../types/index.js";
import Transition from "./transition.js";

interface FadeProps extends PropsOf<typeof Transition> {}

export const Fade: React.FC<FadeProps> = (props) => {
    return (
        <Transition
            enter="transition-opacity duration-300 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            {...props}
        >
            {props.children}
        </Transition>
    );
};
