import React from "react";
import type { PropsOf } from "../../types/index.js";
import { Icon } from "./icon.js";
import { withPrefix } from "../../util/system.js";

interface ChevronRightIconProps extends Omit<PropsOf<typeof Icon>, "children"> {}

export const ChevronRightIcon = React.forwardRef<HTMLElement, ChevronRightIconProps>((props, ref) => {
    return (
        <Icon ref={ref} {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 256 256"
            >
                <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path>
            </svg>
        </Icon>
    );
});

ChevronRightIcon.displayName = withPrefix("ChevronRightIcon");
