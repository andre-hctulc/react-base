import Icon, { IconProps } from "../icon";

export default function ChevronDoubleUpIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
            </svg>
        </Icon>
    );
}
