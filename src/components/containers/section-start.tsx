import type { FC, ReactNode } from "react";
import { tv } from "tailwind-variants";
import type { PartialPropsOf, PropsOf, WithTVProps } from "../../types/index.js";
import { Icon } from "../icons/icon.js";
import { Subtitle } from "../text/subtitle.js";

const sectionStart = tv({
    base: "",
    variants: {
        my: {
            xs: "my-1",
            sm: "my-3",
            md: "my-5",
            lg: "my-8",
            none: "",
        },
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
        variant: {
            default: "",
            divider: "border-b pb-3",
            contrast: "bg-paper2 px-3 py-1.5 rounded-xs",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

type SectionStartProps = WithTVProps<
    PropsOf<"div"> & {
        icon?: React.ReactNode;
        iconProps?: PartialPropsOf<typeof Icon>;
        subtitleProps?: PropsOf<typeof Subtitle>;
        end?: ReactNode;
        subtitleVariant?: PropsOf<typeof Subtitle>["variant"];
        title?: string;
    },
    typeof sectionStart
>;

/**
 * ### Props
 * - `title` - Section title
 * - `mt` - Margin top
 * - `mb` - Margin bottom
 * - `my` - Margin y
 * - `variant`
 */
export const SectionStart: FC<SectionStartProps> = ({
    children,
    className,
    mt,
    mb,
    my,
    title,
    icon,
    iconProps,
    subtitleProps,
    variant,
    end,
    subtitleVariant,
    ...props
}) => {
    const defaultVariant = variant === "default" || !variant;

    return (
        <div className={sectionStart({ className, my, mt, mb, variant })} {...props}>
            {(title || icon) && (
                <div className="flex items-center gap-3">
                    <Subtitle
                        {...subtitleProps}
                        icon={icon}
                        variant={subtitleVariant ?? subtitleProps?.variant ?? (defaultVariant ? "h2" : "h3")}
                    >
                        {title}
                    </Subtitle>
                    {end && <div className="min-w-0 ml-auto">{end}</div>}
                </div>
            )}
            {children}
        </div>
    );
};
