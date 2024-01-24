import React from "react";
import Card from "@react-client/components/layout/containers/cards/card";
import Typography from "@react-client/components/text/typography";
import Styled from "@react-client/components/others/styled";
import { collapse } from "@client-util/helpers";

interface InfoCardProps {
    size?: "small" | "medium" | "large";
    icon?: React.ReactElement;
    title?: string;
    children?: React.ReactNode;
    className?: string;
}

export default function InfoCard(props: InfoCardProps) {
    const size = props.size || "medium";
    const [maxWidth, iconSize] = collapse(size, { small: [250, 30], medium: [270, 34], large: [320, 38] });

    return (
        <Card className={props.className} style={{ maxWidth }} variant="outlined">
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
