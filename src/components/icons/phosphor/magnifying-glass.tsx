import type { FC } from "react";
import type { PropsOf } from "../../../types/index.js";
import { Icon } from "../icon.js";

interface MagnifyingGlassIconProps extends Omit<PropsOf<typeof Icon>, "children"> {}

export const MagnifyingGlassIcon: FC<MagnifyingGlassIconProps> = (props) => {
    return (
        <Icon {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1rem"
                height="1rem"
                fill="currentColor"
                viewBox="0 0 256 256"
                strokeWidth={3}
            >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
            </svg>
        </Icon>
    );
};
