import Transition from "./transition";

interface FadeProps {
    in?: boolean;
    children: React.ReactElement;
}

export default function Fade(props: FadeProps) {
    return (
        <Transition in={!!props.in} unmountOnExit transitionName="T-Fade" timeout={130}>
            {props.children}
        </Transition>
    );
}
