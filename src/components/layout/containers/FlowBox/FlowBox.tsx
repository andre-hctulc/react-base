// * SSR

import React from "react";
import clsx from "clsx";
import { alignClass, justifyClass } from "@react-client/util";

interface FlowBoxProps {
    className?: string;
    style?: React.CSSProperties;
    /** Spacing in Pixeln */
    spacing?: number;
    align?: "start" | "end" | "center";
    justify?: "start" | "end" | "center";
    children?: React.ReactNode;
    minH0?: boolean;
    minW0?: boolean;
    tag?: string;
}

const FlowBox = React.forwardRef<Element, FlowBoxProps>((props, ref) => {
    const align = props.align && alignClass(props.align);
    const justify = props.justify && justifyClass(props.justify);
    const classes = clsx("flex flex-wrap items-start", props.minW0 && "min-w-0", props.minH0 && "min-h-0", align, justify, props.className);
    const Comp: any = props.tag || "div";

    return (
        <Comp className={classes} ref={ref} style={{ rowGap: props.spacing, columnGap: props.spacing, ...props.style }}>
            {props.children}
        </Comp>
    );
});

FlowBox.displayName = "FlowBox";

export default FlowBox;
