import _plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss";
import type { SafelistConfig } from "tailwindcss/types/config";

/*
This is used to setup the tailwindcss configuration fot react-base.
A base theme is defined and the safelest is extended with dynamic created classes
*/

/** Merges a user config with the base config. */
export default function setup(config: Config): Config {
    // Add dynamic created classes from `themeColor` (src/util) to the safelist

    const colors = { ...config.theme?.colors, ...baseTheme.colors };
    const safelist: SafelistConfig[] = [...(config.safelist || [])];

    for (const color in colors) {
        const colorDef = colors[color];

        // DEBUG if (color === "primary") console.log(colorDef);

        if (isThemeColor(colorDef)) {
            const pattern = `^(bg|text|border)-${color}(-(light|super-light|dark|contrast-text))?$`;
            // See src/util/ThemeColorDef
            safelist.push({ pattern: new RegExp(pattern), variants: ["hover", "focus", "active"] });
        }
    }

    return {
        ...config,
        // Add base theme
        theme: { ...config.theme, ...baseTheme },
        // Add plugin
        plugins: [...(config.plugins || []), plugin],
        // Add safelist
        safelist,
    };
}

// Helpers

function isThemeColor(
    obj: any
): obj is { DEFAULT: string; light: string; dark: string; "super-light": string; "contrast-text": string } {
    return (
        obj &&
        typeof obj === "object" &&
        typeof obj.DEFAULT === "string" &&
        typeof obj.light === "string" &&
        typeof obj.dark === "string" &&
        typeof obj["super-light"] === "string" &&
        typeof obj["contrast-text"] === "string"
    );
}

// Plugin

const plugin = _plugin((api) => {});

// Base Theme

type BaseTheme = Omit<Exclude<Config["theme"], undefined>, "extend">;

const baseTheme: BaseTheme = {
    // Must match with default breakpoints in `BreakpointsProvider`
    screens: {
        sm: "720px",
        md: "1300px",
        lg: "1600px",
        xl: "2000px",
    },
    colors: {
        // Theme Colors
        primary: {
            DEFAULT: "#6366f1",
            light: "#a0a9ff",
            dark: "#4f46e5",
            "super-light": "#cecbff",
            "contrast-text": "#f9f9f9",
        },
        secondary: {
            DEFAULT: "#e23176",
            light: "#f39abc",
            dark: "#962953",
            "super-light": "#fad2e1",
            "contrast-text": "#f9f9f9",
        },
        accent: {
            DEFAULT: "#3b383d",
            light: "#737373",
            dark: "#232024",
            "contrast-text": "#f9f9f9",
            "super-light": "#c6c6c6",
        },
        info: {
            DEFAULT: "#1976d2",
            light: "#77a4d1",
            "super-light": "#E5F5FD",
            dark: "#1565c0",
            "contrast-text": "#f9f9f9",
        },
        error: {
            DEFAULT: "#ef4444",
            light: "#ff6262",
            "super-light": "#FDEDED",
            dark: "#dc2626",
            "contrast-text": "#000000",
        },
        success: {
            DEFAULT: "#48b657",
            light: "#95dd95",
            "super-light": "#e2f9e2",
            dark: "#176e22",
            "contrast-text": "#f9f9f9",
        },
        warning: {
            DEFAULT: "#f97316",
            light: "#f8af7c",
            "super-light": "#faecd7",
            dark: "#ea580c",
            "contrast-text": "#000000",
        },
        // More
        bg: {
            DEFAULT: "#ffffff",
            paper: "#f7f7f7",
            // Dunklere Hintergründe, um verschieden Helligkeiten umzusetzen, ohne opacity zu verwenden. Wie bei action.*
            // Wird bpw. bei IconButton contained verwendet
            paper2: "#ececec",
            paper3: "#e4e4e4",
            dark: "#d8d8d8",
        },
        text: {
            DEFAULT: "#000000",
            disabled: "#b0b0b0",
            secondary: "#707070",
            contrast: "#f9f9f9",
        },
        action: {
            hover: "#dddddd44",
            active: "#c7c7c74b",
            focus: "#c8c8c844",
            selected: "#b5b5b555",
            dragover: "#fffad858",
        },
        common: {
            black: "#000000",
            white: "#ffffff",
            disabled: "#b0b0b0",
            red: "#ed1414",
            green: "#0ea118",
            blue: "#0e1fa1",
            violet: "#9c0ea1",
            yellow: "#e3d01c",
            gray: "#b1b1b1",
            grey: "#b1b1b1",
        },
        divider: "#afafaf77",
        transparent: "transparent",
    },
};
