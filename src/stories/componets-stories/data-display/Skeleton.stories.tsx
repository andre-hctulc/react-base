import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "../../../components/data-display/index.js";

// #### META ####
const meta = {
    title: "data-display/skeleton",
    component: Skeleton,
    parameters: {
        layout: "centered",
    },
    argTypes: {},
} satisfies Meta<typeof Skeleton>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => (
        <Skeleton>
            <span>some content</span>
        </Skeleton>
    ),
    args: {},
};
// ---- STORIES ----
