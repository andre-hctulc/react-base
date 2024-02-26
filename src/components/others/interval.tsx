import useInterval from "../../hooks/document/useInterval";

interface IntervalProps {
    callback: () => void;
    /** @default 1000 */
    delay?: number;
}

/** Ermöglicht conditional mounting für Intervalle. */
export default function Interval(props: IntervalProps) {
    useInterval(() => {
        props.callback();
    }, props.delay || 1000);
    return <></>;
}
