import type { Meta, StoryObj } from "@storybook/react";
import { Subtitle } from "../../../components/text/index.js";

// #### META ####
const meta = {
    title: "text/subtitle",
    component: Subtitle,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        children: { control: "text", name: "Subtitle" },
        // remove from ui
        style: { table: { disable: true } },
        className: { table: { disable: true } },
        as: { table: { disable: true } },
        icon: { table: { disable: true } },
        iconProps: { table: { disable: true } },
    },
} satisfies Meta<typeof Subtitle>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { children: "I am a Subtitle" },
};
// ---- STORIES ----
