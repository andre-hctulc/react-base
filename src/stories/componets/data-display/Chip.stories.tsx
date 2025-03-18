import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "../../../components/data-display";

// #### META ####
const meta = {
    title: "data-display/chip",
    component: Chip,
    parameters: {
        layout: "centered",
    },
    argTypes: {},
    args: {},
} satisfies Meta<typeof Chip>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => (
        <Chip>
            <span>some content</span>
        </Chip>
    ),
    args: {},
};
// ---- STORIES ----
