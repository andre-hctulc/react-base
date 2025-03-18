import type { Meta, StoryObj } from "@storybook/react";
import { Center } from "../../../components/containers";

// #### META ####
const meta = {
    title: "containers/center",
    component: Center,
    parameters: {
        layout: "centered",
    },
    argTypes: {},
    args: {},
} satisfies Meta<typeof Center>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <span>i am centered</span>,
    },
};
// ---- STORIES ----
