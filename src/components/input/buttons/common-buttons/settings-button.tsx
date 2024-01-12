// * SSR

import React from "react";
import SettingsIcon from "@react-client/components/icons/collection/settings";
import LinkContainer from "@react-client/components/navigation/link-container";
import Button from "../button";

interface SettingsButtonProps {
    className?: string;
    style?: React.CSSProperties;
    href: string;
    children?: string;
}

export default function SettingsButton(props: SettingsButtonProps) {
    return (
        <LinkContainer className={props.className} style={props.style} href={props.href}>
            <Button color="text_secondary" startIcon={<SettingsIcon />}>
                {" "}
                {props.children || "Einstellungen"}
            </Button>
        </LinkContainer>
    );
}
