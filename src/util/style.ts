import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import type { FlowbiteBoolean, FlowbiteSizes, ThemingProps } from "flowbite-react/types";

// #### Base ####

export interface WithDefaultVariants {
    /**
     * Provide default values for theme props.
     *
     * This field is omitted in the {@link TProps} interface.
     */
    defaultVariants?: Record<string, string | boolean | number>;
}

export interface BaseTheme extends WithDefaultVariants {
    base: string;
}

export type FlatThemingProps<T> = Omit<
    {
        [K in keyof T]?: T[K] extends object
            ? T[K] extends FlowbiteBoolean
                ? boolean | Exclude<keyof T[K], keyof FlowbiteBoolean>
                : keyof T[K]
            : never;
    },
    keyof WithDefaultVariants
>;

export type FlatCompoundThemingProps<T> = {
    [K in keyof T]?: FlatThemingProps<T[K]>;
};

/**
 * If the *root* key is present, the theme is interpreted as a compound theme.
 * *defaultValues* can be used to assign default values for theme props, but are omitted from theming props.
 */
export type TProps<T> = ThemingProps<T> &
    ("root" extends keyof T ? FlatCompoundThemingProps<T> : FlatThemingProps<T>);

/**
 * Collects css classes from a theme object based on the provided props.
 */
export function collectClasses(theme: object, props: any, collectClassNameFromProps: boolean): string {
    const rootClasses: string[] = [];
    const defaultValues = (theme as any).defaultValues as Record<string, any> | undefined;

    if (collectClassNameFromProps && typeof props.className === "string") {
        rootClasses.push(props.className);
    }

    for (const [key, themeValue] of Object.entries(theme)) {
        // skip default values definition
        if (key === "defaultValues") continue;

        const defaultValue = defaultValues ? defaultValues[key] : undefined;

        if (typeof themeValue === "string") {
            rootClasses.push(themeValue);
        } else if (themeValue && typeof themeValue === "object") {
            let propValue = props[key];

            if (propValue === undefined && defaultValue !== undefined) {
                propValue = defaultValue;
            }

            let classValue: string;

            if (typeof propValue === "string") {
                classValue = themeValue[propValue];
            } else if (typeof propValue === "boolean") {
                classValue = themeValue[propValue ? "on" : "off"];
            } else {
                // skip unrecognized prop value
                continue;
            }

            if (typeof classValue === "string") {
                rootClasses.push(classValue);
            }
        } else {
            // unrecognized type, skip
        }
    }

    return twMerge(rootClasses);
}

// #### Flex ####

export type FlexDirection = "row" | "row_reverse" | "col" | "col_reverse";
export interface WithFlex {
    flex: Record<FlexDirection, string>;
}
export interface WithFlexDirection {
    direction: Record<FlexDirection, string>;
}
export const flexDirection: Record<FlexDirection, string> = {
    row: "flex flex-row",
    row_reverse: "flex flex-row-reverse",
    col: "flex flex-col",
    col_reverse: "flex flex-col-reverse",
};

export type FlexWrap = "none" | "normal" | "reverse";

export interface WithFlexWrap {
    wrap: Record<FlexWrap, string>;
}

export const flexWrap: Record<FlexWrap, string> = {
    none: "flex-nowrap",
    normal: "flex-wrap",
    reverse: "flex-wrap-reverse",
};

// #### Grow/Shrink ####

export interface WithGrow {
    grow: FlowbiteBoolean;
}

export const flexGrow: FlowbiteBoolean = {
    on: "grow",
    off: "",
};

export interface WithNoShrink {
    noShrink: FlowbiteBoolean;
}
export const noShrink: FlowbiteBoolean = {
    on: "shrink-0",
    off: "",
};

// #### Align Items ####

export type AlignItems = "auto" | "start" | "center" | "end" | "stretch" | "baseline";
export type JustifyContent = "start" | "center" | "end" | "between" | "around";

export interface WithAlignItems {
    alignItems: Record<AlignItems, string>;
}

export interface WithJustifyContent {
    justifyContent: Record<JustifyContent, string>;
}

export const alignItems: Record<AlignItems, string> = {
    auto: "",
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline",
};

export const justifyContent: Record<JustifyContent, string> = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
};

// #### Size ####

export interface WithSize {
    size: FlowbiteSizes;
}

// #### Width/Height ####

type SizeLike = "full" | "screen" | "auto" | "min" | "max" | "fit" | "0";

export interface WithHeight {
    height: Record<SizeLike, string>;
    maxHeight: Record<SizeLike, string>;
    minHeight: Record<SizeLike, string>;
}
export const height: Record<SizeLike, string> = {
    full: "h-full",
    screen: "h-screen",
    auto: "h-auto",
    min: "h-min",
    max: "h-max",
    fit: "h-fit",
    "0": "h-0",
};
export const maxHeight: Record<SizeLike, string> = {
    full: "max-h-full",
    screen: "max-h-screen",
    auto: "max-h-auto",
    min: "max-h-min",
    max: "max-h-max",
    fit: "max-h-fit",
    "0": "max-h-0",
};
export const minHeight: Record<SizeLike, string> = {
    full: "min-h-full",
    screen: "min-h-screen",
    auto: "min-h-auto",
    min: "min-h-min",
    max: "min-h-max",
    fit: "min-h-fit",
    "0": "min-h-0",
};
export const withHeight: WithHeight = {
    height,
    maxHeight,
    minHeight,
};

export interface WithWidth {
    width: Record<SizeLike, string>;
    maxWidth: Record<SizeLike, string>;
    minWidth: Record<SizeLike, string>;
}
export const width: Record<SizeLike, string> = {
    full: "w-full",
    screen: "w-screen",
    auto: "w-auto",
    min: "min-w-full",
    max: "max-w-full",
    fit: "w-fit",
    "0": "w-0",
};
export const maxWidth: Record<SizeLike, string> = {
    full: "max-w-full",
    screen: "max-w-screen",
    auto: "max-w-auto",
    min: "max-w-min",
    max: "max-w-max",
    fit: "max-w-fit",
    "0": "max-w-0",
};
export const minWidth: Record<SizeLike, string> = {
    full: "min-w-full",
    screen: "min-w-screen",
    auto: "min-w-auto",
    min: "min-w-min",
    max: "min-w-max",
    fit: "min-w-fit",
    "0": "min-w-0",
};
export const withWidth: WithWidth = {
    width,
    maxWidth,
    minWidth,
};

export interface WithWidthAndHeight extends WithWidth, WithHeight {}

export const withWidthAndHeight: WithWidthAndHeight = {
    ...withWidth,
    ...withHeight,
};

export function createDefaultSizeTheme<T>(prefix: string): Record<keyof FlowbiteSizes, string> {
    return {
        xs: `${prefix}-0.5`,
        sm: `${prefix}-1`,
        md: `${prefix}-2`,
        lg: `${prefix}-4`,
        xl: `${prefix}-8`,
        "2xl": `${prefix}-12`,
        "3xl": `${prefix}-16`,
        "4xl": `${prefix}-24`,
        "5xl": `${prefix}-32`,
        "6xl": `${prefix}-40`,
        "7xl": `${prefix}-50`,
    };
}

// #### Padding ####

export interface WithPadding {
    p: FlowbiteSizes;
    px: FlowbiteSizes;
    py: FlowbiteSizes;
    pt: FlowbiteSizes;
    pr: FlowbiteSizes;
    pb: FlowbiteSizes;
    pl: FlowbiteSizes;
    pe: FlowbiteSizes;
    ps: FlowbiteSizes;
}

export const withPadding: WithPadding = {
    p: createDefaultSizeTheme("p"),
    px: createDefaultSizeTheme("px"),
    py: createDefaultSizeTheme("py"),
    pt: createDefaultSizeTheme("pt"),
    pr: createDefaultSizeTheme("pr"),
    pb: createDefaultSizeTheme("pb"),
    pl: createDefaultSizeTheme("pl"),
    pe: createDefaultSizeTheme("pe"),
    ps: createDefaultSizeTheme("ps"),
};

// #### Margin ####

export interface WithMargin {
    m: FlowbiteSizes;
    mx: FlowbiteSizes;
    my: FlowbiteSizes;
    mt: FlowbiteSizes;
    mr: FlowbiteSizes;
    mb: FlowbiteSizes;
    ml: FlowbiteSizes;
    me: FlowbiteSizes;
    ms: FlowbiteSizes;
}

export const withMargin: WithMargin = {
    m: createDefaultSizeTheme("m"),
    mx: createDefaultSizeTheme("mx"),
    my: createDefaultSizeTheme("my"),
    mt: createDefaultSizeTheme("mt"),
    mr: createDefaultSizeTheme("mr"),
    mb: createDefaultSizeTheme("mb"),
    ml: createDefaultSizeTheme("ml"),
    me: createDefaultSizeTheme("me"),
    ms: createDefaultSizeTheme("ms"),
};

// #### Gap/Spacing ####

export interface WithGap {
    gap: FlowbiteSizes;
    rowGap: FlowbiteSizes;
    colGap: FlowbiteSizes;
}

export const withGap: WithGap = {
    gap: createDefaultSizeTheme("gap"),
    rowGap: createDefaultSizeTheme("row-gap"),
    colGap: createDefaultSizeTheme("column-gap"),
};

export interface WithSpacing {
    spaceX: FlowbiteSizes;
    spaceY: FlowbiteSizes;
}

export const withSpacing: WithSpacing = {
    spaceX: createDefaultSizeTheme("space-x"),
    spaceY: createDefaultSizeTheme("space-y"),
};

// #### Border ####

export interface BorderOptions {
    on: string;
    off: string;
    thin: string;
    thicker: string;
    thick: string;
}

export type BorderColor = "divider" | "divider-dark";

export interface WithBorder {
    border: BorderOptions;
    borderColor: Record<BorderColor, string>;
}

export const withBorder: WithBorder = {
    border: {
        on: "border",
        off: "border-0",
        thin: "border-[0.5px]",
        thicker: "border-[1.5px]",
        thick: "border-2",
    },
    borderColor: {
        divider: "border-divider",
        "divider-dark": "border-divider-dark",
    },
};

// #### Scroll ####

export interface WithScroll {
    scroll: FlowbiteBoolean;
    scrollY: FlowbiteBoolean;
    scrollX: FlowbiteBoolean;
}

export const withScroll: WithScroll = {
    scroll: {
        on: "overflow-auto",
        off: "",
    },
    scrollY: {
        on: "overflow-y-auto",
        off: "",
    },
    scrollX: {
        on: "overflow-x-auto",
        off: "",
    },
};

// #### Shape ####

export type Shape =
    | "rounded_xs"
    | "rounded_sm"
    | "rounded_md"
    | "rounded_lg"
    | "rounded_xl"
    | "rounded_2xl"
    | "rounded_3xl"
    | "circle"
    | "square";

export interface WithShape {
    shape: Record<Shape, string>;
}

export const shape: Record<Shape, string> = {
    rounded_xs: "rounded-xs",
    rounded_sm: "rounded-sm",
    rounded_md: "rounded-md",
    rounded_lg: "rounded-lg",
    rounded_xl: "rounded-xl",
    rounded_2xl: "rounded-2xl",
    rounded_3xl: "rounded-3xl",
    circle: "rounded-full",
    square: "rounded-[1px]",
};

// #### Shadow ####

export type ShadowSize = "sm" | "md" | "lg" | "xl" | "2xl" | "inner" | "none";

export interface WithShadow {
    shadow: Record<ShadowSize, string>;
}

export const shadow: Record<ShadowSize, string> = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
    inner: "shadow-inner",
    none: "shadow-none",
};
