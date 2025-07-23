import type { Meta, StoryObj } from "@storybook/react";
import { Title } from "../../../components/text/index.js";

// #### META ####
const meta = {
    title: "text/title",
    component: Title,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        children: { control: "text", name: "Title" },
        // remove from ui
        style: { table: { disable: true } },
        className: { table: { disable: true } },
        as: { table: { disable: true } },
        icon: { table: { disable: true } },
        iconProps: { table: { disable: true } },
        content: { table: { disable: true } },
    },
} satisfies Meta<typeof Title>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { children: "I am a Title" },
};
// ---- STORIES ----
