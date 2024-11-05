import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types";

const dialogBody = tv({
    base: "px-6 py-5 box-border",
    variants: {},
    defaultVariants: {},
});

interface DialogBodyProps extends TVCProps<typeof dialogBody, "div"> {}

export const DialogBody: React.FC<DialogBodyProps> = ({ children, className, ...props }) => {
    return (
        <div className={dialogBody({ className })} {...props}>
            {children}
        </div>
    );
};
