import clsx from "clsx";
import Avatar from "../avatar/Avatar";
import Skeleton from "../feedback/Skeleton";
import LaunchIcon from "../../icons/collection/Launch";
import IconButton from "../../input/buttons/IconButton";
import Stack from "../../layout/Stack";
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
                <Typography truncate className="!text-[13px] mt-1">{props.children}</Typography>
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
