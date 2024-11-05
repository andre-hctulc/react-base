import { tv, type VariantProps } from "tailwind-variants";
import type { XStyleProps } from "../../types";

const formControl = tv({
    base: "flex",
    variants: {
        direction: {
            row: "flex-row gap-2",
            col: "flex-col gap-2",
        },
    },
    defaultVariants: {
        direction: "col",
    },
});

interface FormControlProps extends VariantProps<typeof formControl>, XStyleProps {
    children?: React.ReactNode;
}

export const FormControl: React.FC<FormControlProps> = ({ children, direction, className, ...props }) => {
    return (
        <div className={formControl({ direction, className })} {...props}>
            {children}
        </div>
    );
};
