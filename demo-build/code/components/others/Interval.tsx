import { useInterval } from "usehooks-ts";

interface IntervalProps {
    onUpdate: () => void;
    /** @default 1000 */
    delay?: number;
}

/** Ermöglicht conditional mounting für Intervalle. */
export default function Interval(props: IntervalProps) {
    useInterval(() => {
        props.onUpdate();
    }, props.delay || 1000);
    return <></>;
}
