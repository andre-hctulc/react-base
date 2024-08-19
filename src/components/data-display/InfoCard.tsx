import React from "react";
import Card from "../layout/Card";
import Styled from "../shadow/Styled";
import Typography from "../text/Typography";
import type { StyleProps } from "../../types";
import clsx from "clsx";

interface InfoCardProps extends StyleProps {
    icon?: React.ReactElement;
    title?: string;
    children?: React.ReactNode;
}

export default function InfoCard(props: InfoCardProps) {
    return (
        <Card variant="outlined" className={clsx(props.className)} style={{ maxWidth: 270, ...props.style }}>
            <div className="flex flex-row">
                {props.icon && <Styled>{props.icon}</Styled>}
                <div className="flex flex-col pl-2">
                    {props.title && <Typography className="font-bold">{props.title}</Typography>}
                    {typeof props.children === "string" ? (
                        <Typography className="pt-1 font-[14px]" variant="body2" secondary>
                            {props.children}
                        </Typography>
                    ) : (
                        props.children
                    )}
                </div>
            </div>
        </Card>
    );
}
