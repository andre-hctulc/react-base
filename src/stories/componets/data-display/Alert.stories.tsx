import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "../../../components/data-display";

// #### META ####
const meta = {
    title: "data-display/alert",
    component: Alert,
    parameters: {
        //layout: "centered",
    },
    argTypes: {},
    args: { title: "Some Alert text" },
} satisfies Meta<typeof Alert>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
// ---- STORIES ----
