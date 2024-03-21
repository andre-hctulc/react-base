import clsx from "clsx";
import type { LinkProps, StyleProps } from "../../types";
import Avatar from "./Avatar";
import LaunchIcon from "../icons/collection/Launch";
import IconButton from "../buttons/IconButton";
import Flex from "../layout/Flex";
import LinkContainer from "../navigation/LinkContainer";
import Styled from "../shadow/Styled";
import Typography from "../text/Typography";
import Skeleton from "../feedback/Skeleton";
import { styleProps } from "../../util";

interface StatProps extends StyleProps {
    value: any;
    children: string;
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
        <Flex
            direction="row"
            align="center"
            {...styleProps({ style: { minWidth: props.minWidth || 130 } }, props)}
        >
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
                            {props.unit && (
                                <Typography secondary variant="caption" className="ml-1">
                                    {props.unit}
                                </Typography>
                            )}
                        </span>
                    </Skeleton>
                    {props.href && (
                        <LinkContainer
                            target={props.linkTarget}
                            renderLink={props.renderLink}
                            href={props.href}
                        >
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
