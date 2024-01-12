import React from "react";
import Button from "../button";
import LinkContainer from "../../../navigation/link-container";
import LaunchIcon from "@react-client/components/icons/collection/launch";
import { Size } from "@react-client/types";

interface MoreInfoButtonProps {
    className?: string;
    style?: React.CSSProperties;
    href?: string;
    size?: Size;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function MoreInfoButton(props: MoreInfoButtonProps) {
    return (
        <LinkContainer href={props.href} className={props.className} style={props.style}>
            <Button onClick={props.onClick} size={props.size} endIcon={<LaunchIcon />}>
                Mehr Infos
            </Button>
        </LinkContainer>
    );
}
