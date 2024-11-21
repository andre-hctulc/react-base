import { Subtitle } from "../text";
import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types";

const sectionStart = tv({
    variants: {
        mt: {
            responsive: "mt-3 md:mt-5 lg:mt-8",
            sm: "mt-3",
            md: "mt-5",
            lg: "mt-8",
            none: "",
        },
        mb: {
            responsive: "mb-3 md:mb-5 lg:mb-8",
            sm: "mb-3",
            md: "mb-5",
            lg: "mb-8",
            none: "",
        },
        my: {
            responsive: "my-3 md:my-5 lg:my-8",
            sm: "my-3",
            md: "my-5",
            lg: "my-8",
            none: "",
        },
    },
    defaultVariants: {
        mt: "md",
        mb: "md",
    },
});

interface SectionStartProps extends TVCProps<typeof sectionStart, "div"> {}

/**
 * ### Props
 * - `title` - Section title
 * - `mt` - Margin top
 * - `mb` - Margin bottom
 */
export const SectionStart: React.FC<SectionStartProps> = ({
    children,
    className,
    mt,
    mb,
    my,
    title,
    ...props
}) => {
    return (
        <div className={sectionStart({ className, mt, mb, my })} {...props}>
            {title && <Subtitle>{title}</Subtitle>}
            {children}
        </div>
    );
};
