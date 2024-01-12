import Chip from "@react-client/components/data-display/chip/chip";
import VHCenter from "../../layout/containers/vh-center";
import Styled from "@react-client/components/others/styled";
import clsx from "clsx";

interface DrawerHeaderProps {
    className?: string;
    style?: React.CSSProperties;
    icon: React.ReactElement;
}

export default function DrawerHeader(props: DrawerHeaderProps) {
    const classes = clsx("py-2", props.className);

    return (
        <VHCenter className={classes} style={props.style}>
            <Chip alignSelf="center">
                <Styled size={30}>{props.icon}</Styled>
            </Chip>
        </VHCenter>
    );
}
