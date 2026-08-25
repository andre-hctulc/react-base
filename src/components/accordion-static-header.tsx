import { cn } from "@/lib/utils";
import type { ComponentProps, FC } from "react";

interface AccordionStaticHeaderProps extends ComponentProps<"div"> {}

export const AccordionStaticHeader: FC<AccordionStaticHeaderProps> = ({ className, children, ...props }) => {
    return (
        <div className={cn("flex flex-1 items-center justify-between py-2.5", className)} {...props}>
            {children}
        </div>
    );
};
