import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types";

const accordion = tv({});

interface AccordionProps extends TVCProps<typeof accordion, "div"> {}

export const Accordion: React.FC<AccordionProps> = ({ children, className, ...props }) => {
    return (
        <div className={accordion({ className })} {...props}>
            {children}
        </div>
    );
};
