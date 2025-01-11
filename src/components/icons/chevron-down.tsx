import React from "react";
import type { PropsOf } from "../../types";
import { Icon } from "./icon";
import { withPrefix } from "../../util/system";

interface ChevronDownIconProps extends Omit<PropsOf<typeof Icon>, "children"> {}

export const ChevronDownIcon = React.forwardRef<HTMLElement, ChevronDownIconProps>((props, ref) => {
    return (
        <Icon ref={ref} {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
            >
                <path d="M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z"></path>
            </svg>
        </Icon>
    );
});

ChevronDownIcon.displayName = withPrefix("ChevronDownIcon");
