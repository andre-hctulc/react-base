import React from "react";
import type { PropsOf } from "../../types";
import { Icon } from "./icon";
import { withPrefix } from "../../util/system";

interface XIconProps extends Omit<PropsOf<typeof Icon>, "children"> {}

export const XIcon = React.forwardRef<HTMLElement, XIconProps>((props, ref) => {
    return (
        <Icon ref={ref} {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 256 256"
            >
                <path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path>
            </svg>
        </Icon>
    );
});

XIcon.displayName = withPrefix("XIcon");
