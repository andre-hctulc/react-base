import React from "react";
import type { PropsOf } from "../../types/index.js";
import { Icon } from "./icon.js";
import { withPrefix } from "../../util/system.js";

interface MoreVertIconProps extends Omit<PropsOf<typeof Icon>, "children"> {}

export const MoreVertIcon = React.forwardRef<HTMLElement, MoreVertIconProps>((props, ref) => {
    return (
        <Icon ref={ref} {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 256 256"
            >
                <path d="M112,60a16,16,0,1,1,16,16A16,16,0,0,1,112,60Zm16,52a16,16,0,1,0,16,16A16,16,0,0,0,128,112Zm0,68a16,16,0,1,0,16,16A16,16,0,0,0,128,180Z"></path>
            </svg>
        </Icon>
    );
});

MoreVertIcon.displayName = withPrefix("MoreVert");
