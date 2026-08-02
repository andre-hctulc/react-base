import { cn } from "@/util/cn/cn.util.js";
import { cva, type VariantProps } from "class-variance-authority";
import { sz, msz } from "@/util/react/variants.util.js";
import { Title } from "@/components/text/title.js";
import type { PropsOf } from "@/types/index.js";
import type { ComponentProps, ReactNode } from "react";

const pageHeaderVariants = cva("w-full", {
    variants: {
        p: sz("p"),
        px: sz("px"),
        py: sz("py"),
        pt: sz("pt"),
        pr: sz("pr"),
        pb: sz("pb"),
        pl: sz("pl"),
        m: msz("m"),
        mx: msz("mx"),
        my: msz("my"),
        mt: msz("mt"),
        mr: msz("mr"),
        mb: msz("mb"),
        ml: msz("ml"),
        sticky: { true: "sticky top-0 z-10", false: "" },
        relative: { true: "relative", false: "" },
    },
    defaultVariants: { p: "lg" },
});

export type PageHeaderProps = Omit<ComponentProps<"div">, "title"> &
    VariantProps<typeof pageHeaderVariants> & {
        title?: ReactNode;
        titleProps?: PropsOf<typeof Title>;
        badges?: ReactNode;
        actions?: ReactNode;
        pre?: ReactNode;
        center?: boolean;
    };

/** Use inside a `Page` component to display a header with title, badges and actions. */
export const PageHeader: React.FC<PageHeaderProps> = ({
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    m,
    mx,
    my,
    mt,
    mr,
    mb,
    ml,
    sticky,
    relative,
    pre,
    badges,
    actions,
    title,
    titleProps,
    center,
    className,
    children,
    ...rootProps
}) => (
    <div
        className={cn(
            pageHeaderVariants({ p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml, sticky, relative }),
            className,
        )}
        {...rootProps}
    >
        {pre}
        {(badges || actions || title) && (
            <div className={cn("flex gap-3 py-2", center && "justify-center")}>
                {title && <Title {...titleProps}>{title}</Title>}
                {badges && <div className="flex gap-3">{badges}</div>}
                {actions && <div className="flex flex-wrap grow items-center justify-end">{actions}</div>}
            </div>
        )}
        {children}
    </div>
);
