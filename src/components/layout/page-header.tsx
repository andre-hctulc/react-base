"use client";

import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import { createTheme } from "flowbite-react/helpers/create-theme";
import { Title } from "../text/title.js";
import type { PropsOf } from "../../types/index.js";
import type { Page } from "./page.js";
import type { BaseTheme, WithPadding, WithMargin } from "../../util/style.js";
import { withPadding, withMargin } from "../../util/style.js";
import { useResolveT } from "../../hooks/index.js";
import type { ComponentProps, ReactNode } from "react";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        pageHeader: PageHeaderTheme;
    }

    interface FlowbiteProps {
        pageHeader: Partial<WithoutThemingProps<PageHeaderProps>>;
    }
}

export interface PageHeaderTheme extends BaseTheme, WithPadding, WithMargin {
    sticky: Record<"true", string>;
    relative: Record<"true", string>;
}

const pageHeader = createTheme<PageHeaderTheme>({
    base: "w-full",
    sticky: {
        true: "sticky top-0 z-10",
    },
    relative: {
        true: "relative",
    },
    ...withPadding,
    ...withMargin,
    defaultVariants: {
        p: "lg",
    },
});

export interface PageHeaderProps extends Omit<ComponentProps<"div">, "title"> {
    title?: ReactNode;
    titleProps?: PropsOf<typeof Title>;
    badges?: ReactNode;
    actions?: ReactNode;
    children?: ReactNode;
    pre?: ReactNode;
    center?: boolean;
}

/**
 * Use this inside a {@link Page} component to display a header with title, badges and actions.
 */
export const PageHeader: React.FC<PageHeaderProps> = (props) => {
    const { className, restProps, children } = useResolveT("pageHeader", pageHeader, props);
    const { pre, badges, actions, title, titleProps, center, ...rootProps } = restProps;

    return (
        <div className={className} {...rootProps}>
            {pre}
            {(badges || actions || title) && (
                <div className={twMerge("flex gap-3 py-2", center && "justify-center")}>
                    {title && <Title {...titleProps}>{title}</Title>}
                    {badges && <div className="flex gap-3">{badges}</div>}
                    {actions && <div className="flex flex-wrap grow items-center justify-end">{actions}</div>}
                </div>
            )}
            {children}
        </div>
    );
};
