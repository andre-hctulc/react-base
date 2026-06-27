"use client";

import { collapse } from "@dre44/util/objects";
import type { FC, ReactNode } from "react";
import type { LinkComponent, LinkProps, PropsOf, StyleProps } from "../../types/index.js";
import { Subtitle } from "../text/subtitle.js";
import { Icon } from "../icons/icon.js";
import type { BaseTheme, TProps } from "../../util/style.js";
import { CheckIcon, createTheme, XIcon } from "flowbite-react";
import { useResolveT } from "../../hooks/index.js";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        checklist: ChecklistTheme;
    }

    interface FlowbiteProps {
        checklist: Partial<WithoutThemingProps<ChecklistProps>>;
    }
}

export interface ChecklistTheme extends BaseTheme {
    size: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
}

const checklist = createTheme<ChecklistTheme>({
    base: "",
    size: {
        sm: "space-y-1.5",
        md: "space-y-3",
        lg: "space-y-4.5",
        xl: "space-y-7",
    },
    defaultVariants: {
        size: "md",
    },
});

interface ComponentProps {
    titleProps?: PropsOf<typeof Subtitle>;
    textProps?: PropsOf<"p">;
    secondaryTextProps?: PropsOf<"p">;
    iconProps?: PropsOf<typeof Icon>;
    LinkComponent?: LinkComponent;
    linkProps?: LinkProps;
}

export interface ChecklistItem extends ComponentProps {
    key: string;
    title?: ReactNode;
    text?: string;
    secondaryText?: string;
    checked?: boolean;
    href?: string;
    disabled?: boolean;
    secondary?: boolean;
}

type ChecklistProps = TProps<ChecklistTheme> &
    StyleProps &
    ComponentProps & {
        items: ChecklistItem[];
        checkedIcon?: ReactNode;
        uncheckedIcon?: ReactNode;
        checked?: string | string[] | ((item: ChecklistItem) => boolean);
    };

export const Checklist: FC<ChecklistProps> = (props) => {
    const { restProps, children, className } = useResolveT("checklist", checklist, props);
    const {
        items,
        checkedIcon,
        uncheckedIcon,
        checked,
        titleProps,
        textProps,
        secondaryTextProps,
        iconProps,
        LinkComponent,
        linkProps,
        ...rootProps
    } = restProps;
    const cIcon = checkedIcon || <CheckIcon />;
    const uncIcon = uncheckedIcon || <XIcon />;
    const size = props.size ?? "md";
    const iconSize = collapse(size, {
        sm: "md",
        md: "lg",
        lg: "2xl",
        xl: "4xl",
    } as const);
    const iconClasses = collapse(size, {
        sm: "mt-0.5 mr-2",
        md: "mt-0.5 mr-3",
        lg: "mt-0.5 mr-3.5",
        xl: "mr-4",
    } as const);
    const textClasses = collapse(size, {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
    } as const);

    const secTextClasses = collapse(size, {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
    } as const);
    const subtitleVariant = collapse(size, {
        sm: "h5",
        md: "h4",
        lg: "h3",
        xl: "h2",
    } as const);
    const mainClasses = collapse(size, {
        sm: "",
        md: "",
        lg: "",
        xl: "pt-1",
    } as const);

    const isChecked = (item: ChecklistItem): boolean => {
        if (item.checked) {
            return true;
        }
        if (typeof checked === "function") {
            return checked(item);
        }
        if (Array.isArray(checked)) {
            return checked.includes(item.key);
        }
        if (typeof checked === "string") {
            return checked === item.key;
        }
        return false;
    };

    /* 
    
    <div className="space-y-3 mb-8 grow">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3" title={feature.description}>
                            <div className="shrink-0 mt-0.5">
                                {feature.included ? (
                                    <PiCheck className="w-5 h-5 text-green-500" />
                                ) : (
                                    <PiX className="w-5 h-5 text-red-400" />
                                )}
                            </div>
                            <span
                                className={`text-sm ${
                                    feature.included
                                        ? "text-gray-900 dark:text-white"
                                        : "text-gray-400 dark:text-gray-500 line-through"
                                }`}
                            >
                                {feature.name}
                            </span>
                        </div>
                    ))}
                </div>
    */

    return (
        <ol className={className} {...rootProps}>
            {items.map((item) => {
                const checked = isChecked(item);
                const Comp: any = item.href ? item.LinkComponent || LinkComponent || "a" : "div";
                const p = item.href ? { ...linkProps, href: item.href } : {};

                return (
                    <li key={item.key}>
                        <Comp className="flex" {...p}>
                            <div className="">
                                <Icon
                                    color={checked ? "success" : "error"}
                                    size={iconSize}
                                    {...iconProps}
                                    {...item.iconProps}
                                    className={twMerge(
                                        iconClasses,
                                        iconProps?.className,
                                        item.iconProps?.className
                                    )}
                                >
                                    {checked ? cIcon : uncIcon}
                                </Icon>
                            </div>
                            <div className={mainClasses}>
                                {item.title && (
                                    <Subtitle variant={subtitleVariant} {...titleProps} {...item.titleProps}>
                                        {item.title}
                                    </Subtitle>
                                )}
                                {item.text && (
                                    <p
                                        {...textProps}
                                        {...item.textProps}
                                        className={twMerge(
                                            textClasses,
                                            item.disabled && "text-t4 line-through",
                                            item.secondary && "text-t3",
                                            item.textProps?.className,
                                            textProps?.className
                                        )}
                                    >
                                        {item.text}
                                    </p>
                                )}
                                {item.secondaryText && (
                                    <p
                                        {...secondaryTextProps}
                                        {...item.secondaryTextProps}
                                        className={twMerge(
                                            " text-t2",
                                            secTextClasses,
                                            secondaryTextProps?.className,
                                            item.secondaryTextProps?.className
                                        )}
                                    >
                                        {item.secondaryText}
                                    </p>
                                )}
                            </div>
                        </Comp>
                    </li>
                );
            })}
        </ol>
    );
};
