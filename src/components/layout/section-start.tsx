import { Subtitle } from "../text";
import { tv } from "tailwind-variants";
import type { PropsOf, TVCProps } from "../../types";
import { Icon } from "../icons";

const sectionStart = tv({
    base: "flex flex-col",
    variants: {
        mt: {
            xs: "mt-1",
            sm: "mt-3",
            md: "mt-5",
            lg: "mt-8",
            none: "",
        },
        mb: {
            xs: "mb-1",
            sm: "mb-3",
            md: "mb-5",
            lg: "mb-8",
            none: "",
        },
        my: {
            xs: "my-1",
            sm: "my-3",
            md: "my-5",
            lg: "my-8",
            none: "",
        },
        contrast: {
            true: "bg-2 px-3 py-1.5 rounded-sm",
        },
    },
    defaultVariants: {
        my: "md",
    },
});

interface SectionStartProps extends TVCProps<typeof sectionStart, "div"> {
    icon?: React.ReactNode;
    iconProps?: PropsOf<typeof Icon>;
    variant?: "default" | "secondary";
}

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
    icon,
    iconProps,
    variant,
    contrast,
    ...props
}) => {
    const defaultVariant = variant === "default" || !variant;

    return (
        <div className={sectionStart({ className, mt, mb, my, contrast })} {...props}>
            {(title || icon) && (
                <div className="flex items-center gap-2.5">
                    {icon && (
                        <Icon size={defaultVariant ? "md" : "sm"} {...iconProps}>
                            {icon}
                        </Icon>
                    )}
                    <Subtitle variant={defaultVariant ? "h2" : "h3"}>{title}</Subtitle>
                </div>
            )}
            {children}
        </div>
    );
};
