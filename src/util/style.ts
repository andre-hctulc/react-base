import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import type { FlowbiteBoolean, FlowbiteColors, FlowbiteSizes, ThemingProps } from "flowbite-react/types";

/* 

# Conventions

- `With*` interface that represent a theme fragment.
- `with*` functions that provide default theme fragments.
- `add*` functions that augment theme variants with extra options like `auto` or `none`.

*/

// #### Base ####

export const addCssClasses = (element: Element, ...classes: (string | undefined)[]) => {
    if (!element || !classes) return;

    // Split by spaces and filter out empty strings
    const classArray = classes
        .filter(Boolean)
        .join(" ")
        .split(/\s+/)
        .filter((cls) => cls.trim().length > 0);

    classArray.forEach((cls) => {
        const trimmed = cls.trim();
        if (trimmed && !element.classList.contains(trimmed)) {
            element.classList.add(trimmed);
        }
    });
};

export const removeCssClasses = (element: Element, ...classes: (string | undefined)[]) => {
    if (!element || !classes) return;

    // Split by spaces and filter out empty strings
    const classArray = classes
        .filter(Boolean)
        .join(" ")
        .split(/\s+/)
        .filter((cls) => cls.trim().length > 0);

    classArray.forEach((cls) => {
        const trimmed = cls.trim();
        if (trimmed && element.classList.contains(trimmed)) {
            element.classList.remove(trimmed);
        }
    });
};

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

export type ThemeProps<T> = Omit<
    {
        [K in keyof T]?: T[K] extends object
            ? T[K] extends FlowbiteBoolean
                ? boolean | Exclude<keyof T[K], keyof FlowbiteBoolean>
                : keyof T[K]
            : never;
    },
    keyof BaseTheme
>;

export type FlattenOneLevel<T> = {
    [K in keyof T as T[K] extends object ? keyof T[K] : K]: T[K] extends object ? T[K][keyof T[K]] : T[K];
};

/**
 * Flattens compound theming props.
 * Meaning that all sub themes share the same value space.
 */
export type CompoundThemingProps<T> = Partial<
    FlattenOneLevel<{
        [K in keyof T]: ThemeProps<T[K]>;
    }>
>;

/**
 * If the *root* key is present, the theme is interpreted as a compound theme.
 * *defaultVariants* can be used to assign default values for theme props, but are omitted from theming props.
 */
export type TProps<T> = ThemingProps<T> & ("root" extends keyof T ? CompoundThemingProps<T> : ThemeProps<T>);

/**
 * Collects css classes from a theme object based on the provided props.
 */
export function collectClasses(theme: object, props: any, collectClassNameFromProps: boolean): string {
    const rootClasses: string[] = [];
    const defaultVariants = (theme as any).defaultVariants as Record<string, any> | undefined;

    if (collectClassNameFromProps && typeof props.className === "string") {
        rootClasses.push(props.className);
    }

    for (const [key, themeValue] of Object.entries(theme)) {
        // skip default values definition
        if (key === "defaultVariants") continue;

        const defaultValue = defaultVariants ? defaultVariants[key] : undefined;

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

export type AutoOption = {
    auto: string;
};

function addAuto<T>(obj: T, autoValue = ""): T & AutoOption {
    return {
        ...obj,
        auto: autoValue,
    };
}

export type NoneOption = {
    none: string;
};

function addNone<T>(obj: T, noneValue = ""): T & NoneOption {
    return {
        ...obj,
        none: noneValue,
    };
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
// #### Color ####

export interface WithColor {
    color: FlowbiteColors;
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

export function upSize(size: keyof FlowbiteSizes): keyof FlowbiteSizes {
    const order: (keyof FlowbiteSizes)[] = [
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
        "7xl",
    ];
    const index = order.indexOf(size);
    if (index === -1 || index === order.length - 1) {
        return size;
    }
    return order[index + 1];
}

// #### Padding ####

export interface WithPadding {
    p: FlowbiteSizes & NoneOption;
    px: FlowbiteSizes & NoneOption;
    py: FlowbiteSizes & NoneOption;
    pt: FlowbiteSizes & NoneOption;
    pr: FlowbiteSizes & NoneOption;
    pb: FlowbiteSizes & NoneOption;
    pl: FlowbiteSizes & NoneOption;
    pe: FlowbiteSizes & NoneOption;
    ps: FlowbiteSizes & NoneOption;
}

export const withPadding: WithPadding = {
    p: addNone(createDefaultSizeTheme("p")),
    px: addNone(createDefaultSizeTheme("px")),
    py: addNone(createDefaultSizeTheme("py")),
    pt: addNone(createDefaultSizeTheme("pt")),
    pr: addNone(createDefaultSizeTheme("pr")),
    pb: addNone(createDefaultSizeTheme("pb")),
    pl: addNone(createDefaultSizeTheme("pl")),
    pe: addNone(createDefaultSizeTheme("pe")),
    ps: addNone(createDefaultSizeTheme("ps")),
};

// #### Margin ####

export interface WithMargin {
    m: FlowbiteSizes & NoneOption & AutoOption;
    mx: FlowbiteSizes & NoneOption & AutoOption;
    my: FlowbiteSizes & NoneOption & AutoOption;
    mt: FlowbiteSizes & NoneOption & AutoOption;
    mr: FlowbiteSizes & NoneOption & AutoOption;
    mb: FlowbiteSizes & NoneOption & AutoOption;
    ml: FlowbiteSizes & NoneOption & AutoOption;
    me: FlowbiteSizes & NoneOption & AutoOption;
    ms: FlowbiteSizes & NoneOption & AutoOption;
}

export const withMargin: WithMargin = {
    m: addAuto(addNone(createDefaultSizeTheme("m")), "m-auto"),
    mx: addAuto(addNone(createDefaultSizeTheme("mx")), "mx-auto"),
    my: addAuto(addNone(createDefaultSizeTheme("my")), "my-auto"),
    mt: addAuto(addNone(createDefaultSizeTheme("mt")), "mt-auto"),
    mr: addAuto(addNone(createDefaultSizeTheme("mr")), "mr-auto"),
    mb: addAuto(addNone(createDefaultSizeTheme("mb")), "mb-auto"),
    ml: addAuto(addNone(createDefaultSizeTheme("ml")), "ml-auto"),
    me: addAuto(addNone(createDefaultSizeTheme("me")), "me-auto"),
    ms: addAuto(addNone(createDefaultSizeTheme("ms")), "ms-auto"),
};

// #### Gap/Spacing ####

export interface WithGap {
    gap: FlowbiteSizes & NoneOption;
    rowGap: FlowbiteSizes & NoneOption;
    colGap: FlowbiteSizes & NoneOption;
}

export const withGap: WithGap = {
    gap: addNone(createDefaultSizeTheme("gap")),
    rowGap: addNone(createDefaultSizeTheme("row-gap")),
    colGap: addNone(createDefaultSizeTheme("column-gap")),
};

export interface WithSpacing {
    spaceX: FlowbiteSizes & NoneOption;
    spaceY: FlowbiteSizes & NoneOption;
}

export const withSpacing: WithSpacing = {
    spaceX: addNone(createDefaultSizeTheme("space-x")),
    spaceY: addNone(createDefaultSizeTheme("space-y")),
};

// #### Border ####

export interface BorderOptions {
    on: string;
    off: string;
    thin: string;
    thicker: string;
    thick: string;
    thinnest: string;
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
        thinnest: "border-[0.5px]",
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
    | "rounded-xs"
    | "rounded-sm"
    | "rounded-md"
    | "rounded-lg"
    | "rounded-xl"
    | "rounded-2xl"
    | "rounded-3xl"
    | "circle"
    | "square";

export interface WithShape {
    shape: Record<Shape, string>;
}

export const shape: Record<Shape, string> = {
    "rounded-xs": "rounded-xs",
    "rounded-sm": "rounded-sm",
    "rounded-md": "rounded",
    "rounded-lg": "rounded-lg",
    "rounded-xl": "rounded-xl",
    "rounded-2xl": "rounded-2xl",
    "rounded-3xl": "rounded-3xl",
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

// #### Fit ####

export interface WithFit {
    fitHeight: FlowbiteBoolean;
    fitWidth: FlowbiteBoolean;
    fit: FlowbiteBoolean;
}

export const withFit: WithFit = {
    fitHeight: {
        on: "h-fit",
        off: "",
    },
    fitWidth: {
        on: "w-fit",
        off: "",
    },
    fit: {
        on: "w-fit h-fit",
        off: "",
    },
};

// #### Line Clamp ####

export interface WithLineClamp {
    lineClamp: Record<"none" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10", string>;
}

export const lineClamp = {
    none: "",
    "1": "line-clamp-1",
    "2": "line-clamp-2",
    "3": "line-clamp-3",
    "4": "line-clamp-4",
    "5": "line-clamp-5",
    "6": "line-clamp-6",
    "7": "line-clamp-7",
    "8": "line-clamp-8",
    "9": "line-clamp-9",
    "10": "line-clamp-10",
};

export const withLineClamp: WithLineClamp = {
    lineClamp,
};
