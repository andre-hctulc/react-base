import { cn } from "@/lib/utils.js";
import { useId, type ComponentProps, type FC } from "react";

export interface PreventFormSubmissionProps extends Omit<ComponentProps<"input">, "value" | "defaultValue"> {}

export const PreventFormSubmission: FC<PreventFormSubmissionProps> = ({ className, ...props }) => {
    const id = useId();
    return <input name={id} {...props} required defaultValue="" className={cn("sr-only", className)} />;
};
