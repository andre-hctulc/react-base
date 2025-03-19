import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "../../../components/text/index.js";

// #### META ####
const meta = {
    title: "text/typography",
    component: Typography,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        children: { control: "text", name: "text" },
        // remove from ui
        style: { table: { disable: true } },
        className: { table: { disable: true } },
        as: { table: { disable: true } },
        content: { table: { disable: true } },
    },
} satisfies Meta<typeof Typography>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { children: "I am a typography" },
};
// ---- STORIES ----
