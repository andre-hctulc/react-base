import React from "react";
import { eventProps } from "../../util";
import type { ChildrenProps, EventProps, StyleProps } from "../../types";
import clsx from "clsx";

export interface IconProps extends EventProps, ChildrenProps, StyleProps {
    size?: number;
    disabled?: boolean;
    block?: boolean;
    /** degrees (0-360) */
    rotate?: number;
    draggable?: boolean;
}

const Icon = React.forwardRef<SVGElement, IconProps & { children: React.ReactElement }>((props, ref) => {
    return React.cloneElement(props.children, {
        ref,
        draggable: props.draggable,
        ...eventProps(props),
        className: clsx(
            "flex-shrink-0 transition-all",
            props.block ? "block" : "inline-block",
            props.className,
            props.children.props.className,
        ),
        style: {
            width: props.size,
            height: props.size,
            rotate: props.rotate !== undefined ? props.rotate + "deg" : undefined,
            ...props.style,
            ...props.children.props.style,
        }
    });
});

Icon.displayName = "Icon";

export default Icon;
