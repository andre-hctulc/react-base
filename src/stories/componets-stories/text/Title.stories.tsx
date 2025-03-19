import type { Meta, StoryObj } from "@storybook/react";
import { Title } from "../../../components/text/index.js";

// #### META ####
const meta = {
    title: "text/title",
    component: Title,
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof Title>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { content: "I am a Title", children: "children" },
};
// ---- STORIES ----
