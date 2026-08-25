import type { ComponentProps, FC } from "react";
import { cn } from "@/lib/utils.js";
import { Accordion, AccordionItem, AccordionTrigger } from "@/components/ui/accordion.js";

export const AccordionOutline: FC<ComponentProps<typeof Accordion>> = ({ className, ...props }) => {
    return <Accordion className={cn("rounded-lg border", className)} {...props} />;
};

export const AccordionOutlineItem: FC<ComponentProps<typeof AccordionItem>> = ({ className, ...props }) => {
    return <AccordionItem className={cn("border-b px-4 last:border-b-0", className)} {...props} />;
};

export const AccordionOutlineTrigger: FC<ComponentProps<typeof AccordionTrigger>> = ({
    className,
    ...props
}) => {
    return <AccordionTrigger className={cn("items-center", className)} {...props} />;
};
