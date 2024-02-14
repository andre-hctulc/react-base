import clsx from "clsx";
import Chip from "../../data-display/Chip";
import Flex from "../../layout/Flex";
import Styled from "../../others/Styled";

interface DrawerHeaderProps {
    className?: string;
    style?: React.CSSProperties;
    icon: React.ReactElement;
}

export default function DrawerHeader(props: DrawerHeaderProps) {
    return (
        <Flex align="center" justify="center" className={clsx("py-2", props.className)} style={props.style}>
            <Chip alignSelf="center">
                <Styled size={30}>{props.icon}</Styled>
            </Chip>
        </Flex>
    );
}
