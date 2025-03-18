import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "../../../components/text";

// #### META ####
const meta = {
    title: "text/typography",
    component: Typography,
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof Typography>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { content: "I am a typography ", children: "children" },
};
// ---- STORIES ----
