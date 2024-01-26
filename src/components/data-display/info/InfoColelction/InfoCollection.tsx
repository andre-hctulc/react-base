// * SSR

import React from "react";
import Labelize from "../Labelize/Labelize";
import clsx from "clsx";
import { PropsOf, Size } from "@react-client/types";
import { collapse } from "@client-util/helpers";
import { mapChildren } from "@react-client/util";
import FlowBox from "@react-client/components/layout/containers/FlowBox/FlowBox";

interface LabelsProps {
    className?: string;
    style?: React.CSSProperties;
    labelizeProps?: Partial<PropsOf<typeof Labelize>>;
    variant?: "large" | "small";
    children?: React.ReactNode;
    size?: Size;
    pl?: boolean;
}

export default function InfoCollection(props: LabelsProps) {
    const classes = clsx("InfoCollection", props.pl && "pl-4", props.className);
    const children = mapChildren(props.children, child => {
        if (child.type === Labelize) {
            return {
                props: {
                    ...props.labelizeProps,
                    ...child.props,
                },
            };
        } else return { props: child.props };
    });
    const spacing = collapse(props.size || "medium", { small: 10, medium: 17, large: 25 });

    return (
        <FlowBox spacing={spacing} className={classes} style={props.style}>
            {children}
        </FlowBox>
    );
}
