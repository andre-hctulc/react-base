import type { Config } from "tailwindcss";

/* 
Use RGB values, to allow for easier color manipulation
*/

const DIVIDER = "rgb(204, 204, 204)";

/**
 * Use this in the `presets` array in your `tailwind.config.ts` file:
 *
 * ```js
 * const config: Config = {
 *  presets: [baseTheme],
 *  ...
 * }
 * ```
 */
export const baseTheme: Config = {
    content: [],
    theme: {
        extend: {
            borderColor: {
                DEFAULT: DIVIDER,
                light: "rgb(224, 224, 224)",
                dark: "rgb(102, 102, 102)",
            },
            backgroundColor: {
                DEFAULT: "rgb(255, 255, 255)",
                // Alias for elevated-1
                elevated: "rgb(248, 248, 248)",
                "elevated-1": "rgb(248, 248, 248)",
                "elevated-2": "rgb(234, 234, 234)",
                "elevated-3": "rgb(210, 210, 210)",
                "transparent-1": "rgba(128, 128, 128, 0.1)",
                "transparent-2": "rgba(128, 128, 128, 0.2)",
                "transparent-3": "rgba(128, 128, 128, 0.3)",
                "transparent-4": "rgba(128, 128, 128, 0.4)",
            },
            textColor: {
                // Alias for text-1
                DEFAULT: "rgb(0, 0, 0)",
                1: "rgb(0, 0, 0)",
                2: "rgb(102, 102, 102)",
                3: "rgb(153, 153, 153)",
                // Alias for contrast-1
                contrast: "rgb(255, 255, 255)",
                "contrast-1": "rgb(255, 255, 255)",
                "contrast-2": "rgb(204, 204, 204)",
                "contrast-3": "rgb(153, 153, 153)",
            },
        },
        colors: {
            divider: {
                DEFAULT: DIVIDER,
            },
            primary: {
                DEFAULT: "rgb(73, 135, 243)",
                contrast: "rgb(255, 255, 255)",
            },
            secondary: {
                DEFAULT: "rgb(255, 107, 107)",
                contrast: "rgb(255, 255, 255)",
            },
            accent: {
                DEFAULT: "rgb(184, 181, 177)",
                contrast: "rgb(255, 255, 255)",
            },
            error: {
                DEFAULT: "rgb(232, 59, 63)",
                contrast: "rgb(255, 255, 255)",
            },
            success: {
                DEFAULT: "rgb(64, 163, 63)",
                contrast: "rgb(255, 255, 255)",
            },
            warning: {
                DEFAULT: "rgb(255, 202, 40)",
                contrast: "rgb(255, 255, 255)",
            },
            info: {
                DEFAULT: "rgb(15, 115, 198)",
                contrast: "rgb(255, 255, 255)",
            },
            neutral: {
                DEFAULT: "rgb(107, 114, 128)",
                contrast: "rgb(255, 255, 255)",
            },
            black: "rgb(0, 0, 0)",
            white: "rgb(255, 255, 255)",
            transparent: "transparent",
            green: "rgb(0, 255, 0)",
            red: "rgb(255, 0, 0)",
            blue: "rgb(0, 0, 255)",
            yellow: "rgb(255, 255, 0)",
            pink: "rgb(255, 0, 255)",
            cyan: "rgb(0, 255, 255)",
            gray: {
                50: "rgb(249, 250, 251)",
                100: "rgb(244, 245, 247)",
                200: "rgb(229, 231, 235)",
                300: "rgb(210, 214, 220)",
                400: "rgb(159, 166, 178)",
                500: "rgb(107, 114, 128)",
                DEFAULT: "rgb(107, 114, 128)",
                600: "rgb(75, 85, 99)",
                700: "rgb(55, 65, 81)",
                800: "rgb(37, 47, 63)",
                900: "rgb(22, 30, 46)",
            },
        },
    },
};
