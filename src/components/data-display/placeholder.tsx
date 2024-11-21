import { tv } from "tailwind-variants";
import type { TVCProps } from "../../types";
import { Typography } from "../text";
import { Icon } from "../icons";

const placeholder = tv({
    base: "flex items-center justify-center",
    variants: {
        gap: {
            none: "",
            sm: "gap-2.5",
            md: "gap-4",
            lg: "gap-6",
        },
        padding: {
            none: "",
            sm: "p-6",
            md: "p-8",
            lg: "p-10",
        },
    },
    defaultVariants: {
        padding: "md",
        gap: "md",
    },
});

interface PlaceholderProps extends TVCProps<typeof placeholder, "div"> {
    icon?: React.ReactNode;
    helperText?: string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({
    children,
    className,
    icon,
    gap,
    padding,
    helperText,
    ...props
}) => {
    return (
        <div className={placeholder({ className, gap, padding })} {...props}>
            {icon && <Icon size="4xl">{icon}</Icon>}
            {typeof children === "string" ? (
                <Typography variant="secondary">{children ?? "Empty"}</Typography>
            ) : (
                children
            )}
            {helperText && <Typography variant="tertiary">{helperText}</Typography>}
        </div>
    );
};
