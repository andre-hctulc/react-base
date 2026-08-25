import { cn } from "@/lib/utils";
import type { ComponentProps, FC } from "react";

interface AccordionTitleProps extends ComponentProps<"div"> {}

export const AccordionTitle: FC<AccordionTitleProps> = ({ className, children, ...props }) => {
    return (
        <div className={cn("flex flex-1 items-center justify-between py-2.5", className)} {...props}>
            <h3 className="text-sm font-medium">{children}</h3>
        </div>
    );
};
