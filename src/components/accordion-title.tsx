import type { ComponentProps, FC } from "react";

interface AccordionTitleProps extends ComponentProps<"div"> {}

export const AccordionTitle: FC<AccordionTitleProps> = ({ className, children, ...props }) => {
    return <h3 className="text-sm font-medium">{children}</h3>;
};
