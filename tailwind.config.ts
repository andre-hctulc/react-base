import type { Config } from "tailwindcss";

// TODO type Theme ... config als mit theme farben als config zurückgeben

const warningDefault = "#f97316";

const config: Partial<Config> = {
    theme: {
        extend: {
            fontSize: {
                xxs: "10px",
            },
            boxShadow: {
                balanced: "0px 0px 6px -4px #000000",
            },
        },
        // mui breakpoints (https://mui.com/material-ui/customization/breakpoints/) aus Kompatibilitätsgründen verwenden. Default werte: https://tailwindcss.com/docs/screens
        screens: {
            sm: "0px",
            md: "720px",
            lg: "1300px",
            xl: "1600px",
        },
        colors: {
            primary: {
                DEFAULT: "#6366f1",
                light: "#818cf8",
                dark: "#4f46e5",
                "super-light": "#b4b0ff",
                "contrast-text": "#f9f9f9",
            },
            secondary: {
                DEFAULT: "#e23176",
                light: "#f39abc",
                dark: "#962953",
                "contrast-text": "#f9f9f9",
            },
            accent: {
                DEFAULT: "#3b383d",
                light: "#5f5e5f",
                dark: "#232024",
                "contrast-text": "#f9f9f9",
            },
            info: {
                DEFAULT: "#1976d2",
                light: "#659dd5",
                "super-light": "#E5F5FD",
                dark: "#1565c0",
                "contrast-text": "#f9f9f9",
            },
            error: {
                DEFAULT: "#ef4444",
                light: "#ff6262",
                "super-light": "#FDEDED",
                dark: "#dc2626",
            },
            success: {
                DEFAULT: "#48b657",
                light: "#8bdc8b",
                "super-light": "#EDF8ED",
                dark: "#176e22",
                "contrast-text": "#f9f9f9",
            },
            warning: {
                DEFAULT: warningDefault,
                light: "#ff9e59",
                "super-light": "#FFF4E5",
                dark: "#ea580c",
            },
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
            divider: "#afafaf77",
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
            transparent: "transparent",
            highlight: " #04f460",
        },
    },
    plugins: [],
};

export default config;
