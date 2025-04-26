import type { ReactNode } from "react";
import { tv } from "tailwind-variants";
import type { PropsOf, TVCProps } from "../../types/index.js";
import { Icon } from "../icons/icon.js";
import { Subtitle } from "../text/subtitle.js";

const sectionStart = tv({
    base: "flex flex-col",
    variants: {
        margin: {
            xs: "my-1",
            sm: "my-3",
            md: "my-5",
            lg: "my-8",
            none: "",
        },
        border: {
            true: "border-b pb-3",
            false: "",
        },
        contrast: {
            true: "bg-paper2 px-3 py-1.5 rounded-xs",
        },
    },
    defaultVariants: {
        margin: "none",
        border: true,
    },
});

interface SectionStartProps extends TVCProps<typeof sectionStart, "div"> {
    icon?: React.ReactNode;
    iconProps?: PropsOf<typeof Icon>;
    variant?: "default" | "secondary";
    subtitleProps?: PropsOf<typeof Subtitle>;
    actions?: ReactNode;
}

/**
 * ### Props
 * - `title` - Section title
 * - `mt` - Margin top
 * - `mb` - Margin bottom
 *
 * @deprecated use react-base
 */
export const SectionStart: React.FC<SectionStartProps> = ({
    children,
    className,
    margin,
    title,
    icon,
    iconProps,
    variant,
    contrast,
    subtitleProps,
    border,
    actions,
    ...props
}) => {
    const defaultVariant = variant === "default" || !variant;

    return (
        <div className={sectionStart({ className, margin, contrast, border })} {...props}>
            {(title || icon) && (
                <div className="flex items-center gap-3">
                    {icon && (
                        <Icon size={defaultVariant ? "md" : "sm"} {...iconProps}>
                            {icon}
                        </Icon>
                    )}
                    <Subtitle variant={defaultVariant ? "h2" : "h3"} {...subtitleProps}>
                        {title}
                    </Subtitle>
                    {actions && <div className="min-w-0 ml-auto">{actions}</div>}
                </div>
            )}
            {children}
        </div>
    );
};
