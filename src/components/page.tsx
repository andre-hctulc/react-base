import { type FC, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils.js";
import { cva, type VariantProps } from "class-variance-authority";
import { sz, msz } from "@/lib/variants.util.js";
import { Title } from "./title.js";
import { Spinner } from "@/ui/spinner.js";

const pageVariants = cva("box-border w-full min-h-0", {
    variants: {
        width: {
            xs: "max-w-xl mx-auto",
            sm: "max-w-2xl mx-auto",
            md: "max-w-3xl mx-auto",
            lg: "max-w-4xl mx-auto",
            xl: "max-w-5xl mx-auto",
            "2xl": "max-w-6xl mx-auto",
            "3xl": "max-w-7xl mx-auto",
            "4xl": "max-w-8xl mx-auto",
            "5xl": "max-w-8xl mx-auto",
            "6xl": "max-w-8xl mx-auto",
            "7xl": "max-w-8xl mx-auto",
            full: "w-full",
        },
        bg: { none: "", "1": "bg-paper", "2": "bg-paper-2", "3": "bg-paper-3", "4": "bg-paper-4" },
        flex: {
            row: "flex flex-row",
            row_reverse: "flex flex-row-reverse",
            col: "flex flex-col",
            col_reverse: "flex flex-col-reverse",
        },
        grow: { true: "grow", false: "" },
        noShrink: { true: "shrink-0", false: "" },
        sticky: { true: "sticky top-0 z-10", false: "" },
        height: {
            full: "h-full",
            screen: "h-screen",
            auto: "h-auto",
            min: "h-min",
            max: "h-max",
            fit: "h-fit",
            "0": "h-0",
        },
        maxHeight: {
            full: "max-h-full",
            screen: "max-h-screen",
            auto: "max-h-auto",
            min: "max-h-min",
            max: "max-h-max",
            fit: "max-h-fit",
            "0": "max-h-0",
        },
        minHeight: {
            full: "min-h-full",
            screen: "min-h-screen",
            auto: "min-h-auto",
            min: "min-h-min",
            max: "min-h-max",
            fit: "min-h-fit",
            "0": "min-h-0",
        },
    },
    defaultVariants: { width: "md" },
});

export type PageProps = ComponentProps<"div"> & VariantProps<typeof pageVariants>;

/**
 * Page container. Generally there should only be one `Page` per route.
 */
export const Page: FC<PageProps> = ({
    sticky,
    width,
    bg,
    flex,
    grow,
    noShrink = true,
    height,
    maxHeight,
    minHeight,
    className,
    children,
    ...restProps
}) => (
    <div
        className={cn(
            pageVariants({ sticky, width, bg, flex, grow, noShrink, height, maxHeight, minHeight }),
            className,
        )}
        {...restProps}
    >
        {children}
    </div>
);

/** {@link Page} alias */
export const PageLike = Page;

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
        titleProps?: ComponentProps<typeof Title>;
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

const pageContentVariants = cva("max-w-full box-border", {
    variants: {
        p: sz("p"),
        px: sz("px"),
        py: sz("py"),
        pt: sz("pt"),
        pr: sz("pr"),
        pb: sz("pb"),
        pl: sz("pl"),
        height: {
            full: "h-full",
            screen: "h-screen",
            auto: "h-auto",
            min: "h-min",
            max: "h-max",
            fit: "h-fit",
            "0": "h-0",
        },
        maxHeight: {
            full: "max-h-full",
            screen: "max-h-screen",
            auto: "max-h-auto",
            min: "max-h-min",
            max: "max-h-max",
            fit: "max-h-fit",
            "0": "max-h-0",
        },
        minHeight: {
            full: "min-h-full",
            screen: "min-h-screen",
            auto: "min-h-auto",
            min: "min-h-min",
            max: "min-h-max",
            fit: "min-h-fit",
            "0": "min-h-0",
        },
        width: {
            full: "w-full",
            screen: "w-screen",
            auto: "w-auto",
            min: "min-w-full",
            max: "max-w-full",
            fit: "w-fit",
            "0": "w-0",
        },
        maxWidth: {
            full: "max-w-full",
            screen: "max-w-screen",
            auto: "max-w-auto",
            min: "max-w-min",
            max: "max-w-max",
            fit: "max-w-fit",
            "0": "max-w-0",
        },
        minWidth: {
            full: "min-w-full",
            screen: "min-w-screen",
            auto: "min-w-auto",
            min: "min-w-min",
            max: "min-w-max",
            fit: "min-w-fit",
            "0": "min-w-0",
        },
        justifyContent: {
            start: "justify-start",
            center: "justify-center",
            end: "justify-end",
            between: "justify-between",
            around: "justify-around",
        },
        alignItems: {
            auto: "",
            start: "items-start",
            center: "items-center",
            end: "items-end",
            stretch: "items-stretch",
            baseline: "items-baseline",
        },
        flex: {
            row: "flex flex-row",
            row_reverse: "flex flex-row-reverse",
            col: "flex flex-col",
            col_reverse: "flex flex-col-reverse",
        },
        grow: { true: "grow", false: "" },
    },
    defaultVariants: { p: "lg", width: "full" },
});

export type PageContentProps = ComponentProps<"main"> & VariantProps<typeof pageContentVariants>;

/** Use inside a `Page` component to display page content. */
export const PageContent: FC<PageContentProps> = ({
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    height,
    maxHeight,
    minHeight,
    width,
    maxWidth,
    minWidth,
    justifyContent,
    alignItems,
    flex,
    grow,
    className,
    children,
    ...restProps
}) => (
    <main
        className={cn(
            pageContentVariants({
                p,
                px,
                py,
                pt,
                pr,
                pb,
                pl,
                height,
                maxHeight,
                minHeight,
                width,
                maxWidth,
                minWidth,
                justifyContent,
                alignItems,
                flex,
                grow,
            }),
            className,
        )}
        {...restProps}
    >
        {children}
    </main>
);


const spinnerSizeMap = {
    xs: "size-3",
    sm: "size-4",
    md: "size-6",
    lg: "size-8",
    xl: "size-10",
    "2xl": "size-12",
    "3xl": "size-14",
    "4xl": "size-16",
    "5xl": "size-20",
} as const;

type SpinnerSize = keyof typeof spinnerSizeMap;

export interface SpinnerPageProps extends Omit<PageProps, "children"> {
    spinnerSize?: SpinnerSize;
}

export const SpinnerPage: React.FC<SpinnerPageProps> = ({ spinnerSize, ...props }) => (
    <Page {...props}>
        <PageContent height="full" flex="col" className="items-center justify-center">
            <Spinner className={spinnerSizeMap[spinnerSize || "2xl"]} />
        </PageContent>
    </Page>
);
