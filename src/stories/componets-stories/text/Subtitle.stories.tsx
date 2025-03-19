import type { Meta, StoryObj } from "@storybook/react";
import { Subtitle } from "../../../components/text/index.js";

// #### META ####
const meta = {
    title: "text/subtitle",
    component: Subtitle,
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof Subtitle>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { content: "I am a Subtitle", children: "children" },
};
// ---- STORIES ----
