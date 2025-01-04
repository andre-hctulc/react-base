import type { Config } from "tailwindcss";
import { withPrefix } from "./src/util/system";

/* 
Use RGB values, to allow for easier color manipulation
*/

const DIVIDER = "rgb(204, 204, 204)";

const TEXT_2 = "rgb(94, 94, 94)";
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
            // shadows from https://getcssscan.com/css-box-shadow-examples
            boxShadow: {
                // #6
                "even-sm": "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                // #9
                "even": "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                // #3
                "even-md": "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                // #10
                "even-lg":
                    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                // #8
                border: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
                // #41
                "inset-xs": "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset",
                // #25
                "inset-xl":
                    "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;",
            },
            borderColor: {
                DEFAULT: DIVIDER,
                light: "rgb(224, 224, 224)",
                dark: "rgb(102, 102, 102)",
            },
            backgroundColor: {
                // Alias for bg-1
                DEFAULT: "rgb(255, 255, 255)",
                1: "rgb(255, 255, 255)",
                2: "rgb(248, 248, 248)",
                3: "rgb(240, 240, 240)",
                4: "rgb(230, 230, 230)",
                5: "rgb(218, 218, 218)",
                "transparent-1": "rgba(128, 128, 128, 0.1)",
                "transparent-2": "rgba(128, 128, 128, 0.2)",
                "transparent-3": "rgba(128, 128, 128, 0.3)",
                "transparent-4": "rgba(128, 128, 128, 0.4)",
            },
            textColor: {
                // Alias for text-1
                DEFAULT: "rgb(0, 0, 0)",
                1: "rgb(0, 0, 0)",
                2: TEXT_2,
                3: "rgb(151, 151, 151)",
                4: "rgb(178, 178, 178)",
                5: "rgb(204, 204, 204)",
                // Alias for contrast-1
                contrast: "rgb(255, 255, 255)",
                "contrast-1": "rgb(255, 255, 255)",
                "contrast-2": "rgb(204, 204, 204)",
                "contrast-3": "rgb(153, 153, 153)",
            },
            // #### Animations ####
            animation: {
                skeleton: "skeleton 1.5s ease-in-out infinite",
            },
            keyframes: {
                skeleton: {
                    "0%, 100%": {
                        backgroundColor: "theme('backgroundColor.transparent-1')",
                    },
                    "50%": {
                        backgroundColor: "theme('backgroundColor.transparent-2')",
                    },
                },
            },
        },
        // #### Colors ####
        colors: {
            divider: {
                DEFAULT: DIVIDER,
            },
            primary: {
                DEFAULT: "rgb(73, 135, 243)",
                contrast: "rgb(255, 255, 255)",
            },
            secondary: {
                DEFAULT: "rgb(243, 73, 135)",
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
            /**
             * Neutral color. this color blends in with the general theme of the application.
             */
            neutral: {
                DEFAULT: TEXT_2,
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
            gray: "rgb(94, 94, 94)",
            "blueish-gray": "rgb(107, 114, 128)",
        },
    },
};
