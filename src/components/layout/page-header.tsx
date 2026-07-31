import { cn } from "@/util/cn.js";
import { collapse } from "@dre44/util/objects";
import { Title } from "../text/title.js";
import type { PropsOf } from "../../types/index.js";
import { withPadding, withMargin } from "../../util/style.js";
import type { ComponentProps, ReactNode } from "react";

type PadSize = keyof typeof withPadding.p;
type MarginSize = keyof typeof withMargin.mt;

export interface PageHeaderProps extends Omit<ComponentProps<"div">, "title"> {
    title?: ReactNode;
    titleProps?: PropsOf<typeof Title>;
    badges?: ReactNode;
    actions?: ReactNode;
    children?: ReactNode;
    pre?: ReactNode;
    center?: boolean;
    sticky?: boolean;
    relative?: boolean;
    p?: PadSize;
    px?: PadSize;
    py?: PadSize;
    pt?: PadSize;
    pr?: PadSize;
    pb?: PadSize;
    pl?: PadSize;
    m?: MarginSize;
    mx?: MarginSize;
    my?: MarginSize;
    mt?: MarginSize;
    mr?: MarginSize;
    mb?: MarginSize;
    ml?: MarginSize;
}

/** Use inside a `Page` component to display a header with title, badges and actions. */
export const PageHeader: React.FC<PageHeaderProps> = (props) => {
    const {
        p = "lg",
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
    } = props;

    return (
        <div
            className={cn(
                "w-full",
                sticky && "sticky top-0 z-10",
                relative && "relative",
                collapse(withPadding.p, p),
                px && collapse(withPadding.px, px),
                py && collapse(withPadding.py, py),
                pt && collapse(withPadding.pt, pt),
                pr && collapse(withPadding.pr, pr),
                pb && collapse(withPadding.pb, pb),
                pl && collapse(withPadding.pl, pl),
                m && collapse(withMargin.m, m),
                mx && collapse(withMargin.mx, mx),
                my && collapse(withMargin.my, my),
                mt && collapse(withMargin.mt, mt),
                mr && collapse(withMargin.mr, mr),
                mb && collapse(withMargin.mb, mb),
                ml && collapse(withMargin.ml, ml),
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
};
