import Chip from "@react-client/components/data-display/chip/chip";
import Stack from "@react-client/components/layout/containers/Stack/Stack";
import Styled from "@react-client/components/others/Styled";
import clsx from "clsx";

interface DrawerHeaderProps {
    className?: string;
    style?: React.CSSProperties;
    icon: React.ReactElement;
}

export default function DrawerHeader(props: DrawerHeaderProps) {
    return (
        <Stack align="center" justify="center" className={clsx("py-2", props.className)} style={props.style}>
            <Chip alignSelf="center">
                <Styled size={30}>{props.icon}</Styled>
            </Chip>
        </Stack>
    );
}
