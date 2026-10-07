import { cn } from "@/lib/utils.js";
import { useId, type ComponentProps, type FC } from "react";

export interface PreventFormSubmissionProps extends ComponentProps<"input"> {}

export const PreventFormSubmission: FC<PreventFormSubmissionProps> = ({ className, ...props }) => {
    const id = useId();
    return <input required value="" className={cn("sr-only", className)} name={id} {...props}></input>;
};
