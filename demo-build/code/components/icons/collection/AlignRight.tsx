import Icon, { IconProps } from "../Icon";

export default function AlignRightIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <svg fill="current" fillOpacity={1} strokeWidth={0} stroke="none" version="1.1" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <g id="layer1">
                    <path d="M 6 1 L 6 2 L 20 2 L 20 1 L 6 1 z M 11 5 L 11 6 L 20 6 L 20 5 L 11 5 z M 2 9 L 2 10 L 20 10 L 20 9 L 2 9 z M 16 14 L 18 16 L 6 16 L 6 17 L 18 17 L 16 19 L 17.5 19 L 20 16.5 L 17.5 14 L 16 14 z " />
                </g>
            </svg>
        </Icon>
    );
}
