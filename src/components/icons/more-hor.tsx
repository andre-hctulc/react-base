import { type FC } from "react";
import type { PropsOf } from "../../types/index.js";
import { Icon } from "./icon.js";

interface MoreHorIconProps extends Omit<PropsOf<typeof Icon>, "children"> {}

export const MoreHorIcon: FC<MoreHorIconProps> = (props) => {
    return (
        <Icon {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 256 256"
            >
                <path d="M144,128a16,16,0,1,1-16-16A16,16,0,0,1,144,128ZM60,112a16,16,0,1,0,16,16A16,16,0,0,0,60,112Zm136,0a16,16,0,1,0,16,16A16,16,0,0,0,196,112Z"></path>
            </svg>
        </Icon>
    );
};
