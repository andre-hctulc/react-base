import { tv, type ClassValue, type VariantProps } from "tailwind-variants";
import { withPrefix } from "../../util/system";
import React from "react";
import type { PropsOf, TVCProps } from "../../types";
import { HelperText, IconButton } from "../input";
import { InfoCircleIcon } from "../icons/info-circle";

const label = tv({
    base: "inline-block",
    variants: {
        variant: {
            default: "text-base",
            secondary: "text-2 text-sm",
            tertiary: "text-3 text-xs",
        },
        mb: {
            none: "mb-0",
            sm: "mb-1",
            md: "mb-2",
            lg: "mb-3",
            xl: "mb-5",
        },
        mt: {
            none: "mt-0",
            sm: "mt-1",
            md: "mt-2",
            lg: "mt-3",
            xl: "mt-5",
        },
        my: {
            none: "my-0",
            sm: "my-1",
            md: "my-2",
            lg: "my-3",
            xl: "my-5",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

interface LabelProps extends TVCProps<typeof label, "label"> {
    requiredHint?: boolean;
    as?: any;
}

export const Label = React.forwardRef<HTMLElement, LabelProps>(
    ({ children, className, requiredHint, mb, mt, my, as, variant, ...props }, ref) => {
        const Comp = as || "label";

        return (
            <Comp ref={ref as any} className={label({ className, mb, mt, my, variant })} {...props}>
                {children}
                {requiredHint && <span>{" *"}</span>}
            </Comp>
        );
    }
);

Label.displayName = withPrefix("Label");

const labeled = tv({
    variants: {
        orientation: {
            vertical: "flex flex-col",
            horizontal: "flex items-center",
        },
        reverse: {
            true: "",
        },
        gap: {
            none: "",
            sm: "gap-0.5",
            md: "gap-1",
            lg: "gap-2",
            xl: "gap-3.5",
            "2xl": "gap-5",
            "3xl": "gap-7",
        },
        mb: {
            none: "mb-0",
            sm: "mb-1",
            md: "mb-2",
            lg: "mb-3",
            xl: "mb-5",
        },
        mt: {
            none: "mt-0",
            sm: "mt-1",
            md: "mt-2",
            lg: "mt-3",
            xl: "mt-5",
        },
        my: {
            none: "my-0",
            sm: "my-1",
            md: "my-2",
            lg: "my-3",
            xl: "my-5",
        },
    },
    compoundVariants: [
        {
            orientation: "horizontal",
            reverse: true,
            class: "flex-row-reverse justify-end",
        },
        {
            orientation: "vertical",
            reverse: true,
            class: "flex-col-reverse",
        },
    ],
    defaultVariants: {
        orientation: "vertical",
        gap: "md",
    },
});

interface LabeledProps extends VariantProps<typeof labeled> {
    labelProps?: PropsOf<typeof Label>;
    label?: string;
    id?: string;
    className?: ClassValue;
    children: React.ReactElement<{ id?: string }>;
    helperText?: React.ReactNode;
    variant?: PropsOf<typeof Label>["variant"];
    base?: number;
    info?: boolean;
    onInfoClick?: (e: React.MouseEvent) => void;
    infoProps?: PropsOf<typeof IconButton>;
    infoDisabled?: boolean;
    infoIcon?: React.ReactNode;
}

/**
 * ### Props
 * - `orientation` - The orientation of the label and the children
 * - `label` - The label text
 * - `gap` - The gap between the label and the children
 * - `mb`, `mt`, `my` - Margins
 * - `variant` - Controls the variant of the label
 * - `helperText` - A helper text
 * - `base` - The base label with. has only an effect when {@link orientation} is _horizontal_
 */
export const Labeled: React.FC<LabeledProps> = ({
    children,
    labelProps,
    id,
    label,
    orientation,
    mb,
    mt,
    my,
    helperText,
    variant,
    gap,
    base,
    reverse,
    info,
    infoDisabled,
    onInfoClick,
    className,
    infoIcon,
    infoProps,
}) => {
    const _id = id || children.props.id || label;

    return (
        <div className={labeled({ orientation, mb, mt, my, gap, reverse, className })}>
            {label && (
                <span className="inline-flex items-center gap-2">
                    <Label
                        variant={variant}
                        {...labelProps}
                        style={{
                            width: orientation === "horizontal" ? base : undefined,
                            ...labelProps?.style,
                        }}
                        htmlFor={_id}
                    >
                        {label}
                    </Label>
                    {info && (
                        <IconButton size="sm" disabled={infoDisabled} onClick={onInfoClick} {...infoProps}>
                            {infoIcon || <InfoCircleIcon />}
                        </IconButton>
                    )}
                </span>
            )}
            {React.cloneElement(children, { ...children.props, id: _id })}
            {helperText && <HelperText>{helperText}</HelperText>}
        </div>
    );
};
