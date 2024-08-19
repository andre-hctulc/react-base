import Chip from "../data-display/Chip";
import Flex from "../layout/Flex";
import Styled from "../shadow/Styled";
import type { StyleProps } from "../../types";

interface DrawerHeaderProps extends StyleProps {
    style?: React.CSSProperties;
    icon: React.ReactElement;
}

export default function DrawerHeader(props: DrawerHeaderProps) {
    return (
        <Flex align="center" justify="center" className={["py-2", props.className]} style={props.style}>
            <Chip alignSelf="center">
                <Styled size={30}>{props.icon}</Styled>
            </Chip>
        </Flex>
    );
}
