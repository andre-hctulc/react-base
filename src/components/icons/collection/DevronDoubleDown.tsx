import Icon, { IconProps } from "../Icon";

export default function ChevronDoubleDownIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
            </svg>
        </Icon>
    );
}
