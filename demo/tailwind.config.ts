import type { Config } from "tailwindcss";
import baseTheme from "../theme";

const config: Config = {
    content: ["./src/**/*.{ts,tsx}", "../src/**/*.{ts,tsx,scss,css}", "../src/components.scss"],
    theme: baseTheme,
};

export default config;
