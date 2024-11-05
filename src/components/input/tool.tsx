"use client";

import { usePromise } from "../../hooks";
import type { PropsOf } from "../../types";
import { IconButton } from "./button";

export interface ToolItem<T = any> {
    action: (e: React.MouseEvent) => T | Promise<T>;
    icon: React.ReactNode;
    tooltip?: React.ReactNode;
    disabled?: boolean;
    variant?: PropsOf<typeof IconButton>["variant"];
    color?: PropsOf<typeof IconButton>["color"];
    key: string;
}

interface ToolProps extends Omit<PropsOf<typeof IconButton>, "onClick" | "key">, ToolItem {}

export const Tool: React.FC<ToolProps> = ({ icon, action, tooltip, disabled, ...props }) => {
    const { isPending, promise } = usePromise();

    function act(e: React.MouseEvent) {
        e.stopPropagation();
        // transform to promise
        const prom = async () => action(e);
        promise(prom());
    }
    return (
        <IconButton disabled={disabled || isPending} onClick={act} {...props}>
            {icon}
        </IconButton>
    );
};
