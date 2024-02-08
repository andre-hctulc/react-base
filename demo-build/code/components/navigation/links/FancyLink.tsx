

import clsx from "clsx";
import LinkContainer from "./LinkContainer";
import Styled from "../../others/Styled";

interface FancyLinkProps {
    className?: string;
    style?: React.CSSProperties;
    href: string | undefined;
    children: string;
    icon?: React.ReactElement;
    onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLDivElement>;
}

export default function FancyLink(props: FancyLinkProps) {
    const classes = clsx(
        "flex-row items-center px-2.5 py-2 rounded bg-bg hover:bg-action-hover/20 active:!bg-action-hover text-[14px] rounded-md !text-primary shadow-balanced",
        props.className
    );

    return (
        <LinkContainer className={classes} style={props.style} href={props.href} onClick={props.onClick}>
            {props.icon && (
                <Styled className="mr-1.5" color="primary">
                    {props.icon}
                </Styled>
            )}
            {props.children}
        </LinkContainer>
    );
}
