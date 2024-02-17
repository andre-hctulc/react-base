import type { Config } from "tailwindcss";
import setup from "../setup";

const config: Config = {
    content: ["./src/**/*.{ts,tsx}", "../src/**/*.{ts,tsx,scss,css}", "../src/components.scss"],
};

export default setup(config);
