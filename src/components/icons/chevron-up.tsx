import { type FC } from "react";
import type { PropsOf } from "../../types/index.js";
import { Icon } from "./icon.js";

interface ChevronUpIconProps extends Omit<PropsOf<typeof Icon>, "children"> {}

export const ChevronUpIcon: FC<ChevronUpIconProps> = (props) => {
    return (
        <Icon {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 256 256"
            >
                <path d="M216.49,168.49a12,12,0,0,1-17,0L128,97,56.49,168.49a12,12,0,0,1-17-17l80-80a12,12,0,0,1,17,0l80,80A12,12,0,0,1,216.49,168.49Z"></path>
            </svg>
        </Icon>
    );
};
