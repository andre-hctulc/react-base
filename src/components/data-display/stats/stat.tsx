// * SSR

import ShortText from "@react-client/components/text/short-text";
import Typography from "@react-client/components/text/typography";
import clsx from "clsx";
import LaunchIcon from "@react-client/components/icons/collection/launch";
import Styled from "@react-client/components/others/Styled";
import IconButton from "@react-client/components/input/buttons/IconButton/IconButton";
import LinkContainer from "@react-client/components/navigation/links/LinkContainer/LinkContainer";
import Unit from "@react-client/components/text/unit";
import Avatar from "../avatar/avatar";
import Skeleton from "../loading/skeleton";
import Stack from "@react-client/components/layout/containers/Stack/Stack";

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
}

export default function Stat(props: StatProps) {
    return (
        <Stack direction="row" align="center" className={props.className} style={{ minWidth: props.minWidth || 130, ...props.style }}>
            {props.icon && (
                <Avatar className="p-5">
                    <Styled size={20}>{props.icon}</Styled>
                </Avatar>
            )}
            <div className={clsx("flex flex-col min-w-0", props.icon && "pl-3.5")}>
                <ShortText className="!text-[13px] mt-1">{props.children}</ShortText>
                <Stack direction="row" align="center" className="flex-grow">
                    <Skeleton minWidth={25} active={props.value != null}>
                        <span className="flex flex-row items-end">
                            <Typography className="font-bold">{props.value + ""}</Typography>
                            {props.unit && <Unit className="ml-1">{props.unit}</Unit>}
                        </span>
                    </Skeleton>
                    {props.href && (
                        <LinkContainer href={props.href}>
                            <IconButton className="ml-1.5" size="small">
                                <LaunchIcon />
                            </IconButton>
                        </LinkContainer>
                    )}
                </Stack>
            </div>
        </Stack>
    );
}
