import { type FC, type ComponentProps } from "react";
import { cn } from "@/util/cn.js";

export interface LabelMimicProps extends Omit<ComponentProps<"span">, "color"> {
    disabled?: boolean;
    color?: "success" | "failure" | "warning" | "info" | "default";
}

/**
 * A label-styled `<span>` element.
 */
export const LabelMimic: FC<LabelMimicProps> = ({ disabled, color, className, children, ...props }) => (
    <span
        className={cn(
            "text-sm font-medium",
            disabled && "opacity-50",
            color === "success" && "text-success",
            color === "failure" && "text-failure",
            color === "warning" && "text-warning",
            color === "info" && "text-info",
            className,
        )}
        {...props}
    >
        {children}
    </span>
);
