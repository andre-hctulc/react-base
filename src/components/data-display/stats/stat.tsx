import clsx from "clsx";
import type { LinkProps } from "../../../types";
import Avatar from "../avatar/Avatar";
import Skeleton from "../feedback/Skeleton";
import LaunchIcon from "../../icons/collection/Launch";
import IconButton from "../../input/buttons/IconButton";
import Flex from "../../layout/Flex";
import LinkContainer from "../../navigation/links/LinkContainer";
import Styled from "../../others/Styled";
import Typography from "../../text/Typography";
import Unit from "../../text/Unit";

interface StatProps {
    value: any;
    children: string;
    className?: string;
    style?: React.CSSProperties;
    href?: string;
    icon?: React.ReactElement;
    unit?: string;
    /** @default 130 */
    minWidth?: number;
    renderLink?: React.ReactElement<LinkProps>;
    linkTarget?: React.HTMLAttributeAnchorTarget;
}

export default function Stat(props: StatProps) {
    return (
        <Flex direction="row" align="center" className={props.className} style={{ minWidth: props.minWidth || 130, ...props.style }}>
            {props.icon && (
                <Avatar className="p-5">
                    <Styled size={20}>{props.icon}</Styled>
                </Avatar>
            )}
            <div className={clsx("flex flex-col min-w-0", props.icon && "pl-3.5")}>
                <Typography truncate className="!text-[13px] mt-1">
                    {props.children}
                </Typography>
                <Flex direction="row" align="center" className="flex-grow">
                    <Skeleton minWidth={25} active={props.value != null}>
                        <span className="flex flex-row items-end">
                            <Typography className="font-bold">{props.value + ""}</Typography>
                            {props.unit && <Unit className="ml-1">{props.unit}</Unit>}
                        </span>
                    </Skeleton>
                    {props.href && (
                        <LinkContainer target={props.linkTarget} renderLink={props.renderLink} href={props.href}>
                            <IconButton className="ml-1.5" size="small">
                                <LaunchIcon />
                            </IconButton>
                        </LinkContainer>
                    )}
                </Flex>
            </div>
        </Flex>
    );
}
