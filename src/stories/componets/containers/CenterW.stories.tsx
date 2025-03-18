import type { Meta, StoryObj } from "@storybook/react";
import { CenterV } from "../../../components/containers";

// #### META ####
const meta = {
    title: "containers/centerW",
    component: CenterV,
    parameters: {
        layout: "centered",
    },
    argTypes: {},
    args: {},
} satisfies Meta<typeof CenterV>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <span>i am centered vertically</span>,
    },
};
// ---- STORIES ----
