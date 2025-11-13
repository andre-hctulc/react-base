"use client";

import { get } from "flowbite-react/helpers/get";
import { resolveProps } from "flowbite-react/helpers/resolve-props";
import { useResolveTheme } from "flowbite-react/helpers/resolve-theme";
import { useThemeProvider, type ThemeProviderValue } from "flowbite-react/theme/provider";
import type { ReactNode } from "react";
import { collectClasses, type TProps } from "../../util/style.js";

export type RestProps<P, T> = Omit<P, keyof TProps<T> | "className" | "children">;

interface UseTBaseResult<T = any, P = any> {
    /**
     * Does **not** include *children* or *className* or any *theme prop*!
     */
    restProps: RestProps<P, T>;
    /**
     * Children prop
     */
    children: ReactNode;
    /**
     * Theme provider context value
     */
    provider: ThemeProviderValue;
    /**
     * Fully resolved theme object for the component
     */
    theme: T;
}

interface UseTResult<T = any, P = any> extends UseTBaseResult<T, P> {
    /**
     * The computed className for the component
     */
    className: string;
}

interface UseTCompoundResult<T = any, P = any> extends UseTBaseResult<T, P> {
    /**
     * The computed className for the component
     */
    classNames: Record<keyof T, string>;
}

/**
 * Hook to resolve theming props and classes for a `Flowbite React` component.
 */
export function useResolveT<T = any, P = any>(
    componentName: string,
    componentTheme: T,
    props: P
): "root" extends keyof T ? UseTCompoundResult<T, P> : UseTResult<T, P> {
    const provider: any = useThemeProvider();

    // Resolve theme with proper inheritance
    const theme = useResolveTheme<any>(
        [componentTheme, provider.theme?.[componentName], (props as any).theme],
        [get(provider.clearTheme, componentName), (props as any).clearTheme],
        [get(provider.applyTheme, componentName), (props as any).applyTheme]
    );
    const compound = "root" in theme;

    const { children, className, ...restProps } = resolveProps<any>(props, provider.props?.myComponent);
    // remove flowbite theme props
    delete restProps.theme;
    delete restProps.clearTheme;
    delete restProps.applyTheme;
    // remove className input. Is later merged into computed className.
    delete restProps.className;

    const baseResult: any = {
        restProps,
        children,
        provider,
        theme,
        typedRestProps: restProps as any,
    };

    const delThemeProps = (theme: object) => {
        Object.keys(theme).forEach((partName) => {
            delete restProps[partName];
        });
    };

    // compound
    if (compound) {
        baseResult.classNames = Object.keys(theme as object).reduce((acc, partName) => {
            const subTheme = theme[partName];
            acc[partName] = collectClasses(subTheme, props, partName === "root");
            delThemeProps(subTheme);
            return acc;
        }, {} as Record<string, string>);
    }
    // simple
    else {
        baseResult.className = collectClasses(theme, props, true);
        delThemeProps(theme);
    }

    return baseResult;
}
