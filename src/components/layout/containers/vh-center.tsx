import clsx from "clsx";
import React from "react";

interface VHCenterProps {
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
    tag?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
    grow?: boolean;
    noShrink?: boolean;
}

/** @deprecated Benutze `Stack` */
const VHCenter = React.forwardRef<HTMLElement, VHCenterProps>((props, ref) => {
    const classes = clsx("flex flex-col justify-center items-center", props.noShrink && "flex-shrink-0", props.grow && "flex-grow", props.className);
    const Comp: any = props.tag || "div";

    return (
        <Comp ref={ref} onClick={props.onClick} className={classes} style={props.style}>
            {props.children}
        </Comp>
    );
});

VHCenter.displayName = "VHCenter";

export default VHCenter;
