import type { Meta, StoryObj } from "@storybook/react";
import { Center } from "../../../components/containers/center.js";

// #### META ####
const meta = {
    title: "containers/center",
    component: Center,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        // remove from ui
        children: { table: { disable: true } },
    },
    args: {},
} satisfies Meta<typeof Center>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <span className="bg-amber-300">i am the center</span>,
    },
};
// ---- STORIES ----
