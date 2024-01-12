import Transition from "./transition";

interface PseudoTransitionProps {
    in?: boolean;
    timeout: number;
    children: React.ReactElement;
}

export default function PseudoTransition(props: PseudoTransitionProps) {
    return (
        <Transition unmountOnExit in={!!props.in} transitionName="T-pseudo" timeout={props.timeout}>
            {props.children}
        </Transition>
    );
}
