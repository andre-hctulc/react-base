import type { Preview } from "@storybook/react-vite";
// @ts-expect-error
import "./css/storybook.css";

const preview: Preview = {
    parameters: {
        layout: "padded",
    },
};

export default preview;
