import { tv } from "tailwind-variants";
import type { PropsOf, WithTVProps } from "../../types/index.js";

const accordion = tv({});

type AccordionProps = WithTVProps<PropsOf<"div">, typeof accordion>;

export const Accordion: React.FC<AccordionProps> = ({ children, className, ...props }) => {
    return (
        <div className={accordion({ className })} {...props}>
            {children}
        </div>
    );
};
