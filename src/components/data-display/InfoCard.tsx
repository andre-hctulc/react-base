import React from "react";
import Card from "../layout/Card";
import Styled from "../shadow/Styled";
import Typography from "../text/Typography";
import { collapse, styleProps } from "../../util";
import { StyleProps } from "../../types";

interface InfoCardProps extends StyleProps {
    size?: "small" | "medium" | "large";
    icon?: React.ReactElement;
    title?: string;
    children?: React.ReactNode;
}

export default function InfoCard(props: InfoCardProps) {
    const size = props.size || "medium";
    const [maxWidth, iconSize] = collapse(
        size,
        { small: [250, 30], medium: [270, 34], large: [320, 38] },
        []
    );

    return (
        <Card {...styleProps({ style: { maxWidth } }, props)} variant="outlined">
            <div className="flex flex-row">
                {props.icon && <Styled size={iconSize}>{props.icon}</Styled>}
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
