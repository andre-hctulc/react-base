import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "../../../components/data-display/index.js";

// #### META ####
const meta = {
    title: "data-display/spinner",
    component: Spinner,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        // remove from ui
        style: { table: { disable: true } },
        className: { table: { disable: true } },
    },
} satisfies Meta<typeof Spinner>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => <Spinner />,
    args: {},
};
// ---- STORIES ----
