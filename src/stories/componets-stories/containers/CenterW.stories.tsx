import type { Meta, StoryObj } from "@storybook/react";
import { CenterV } from "../../../components/containers/center.js";

// #### META ####
const meta = {
    title: "containers/centerV",
    component: CenterV,
    parameters: {
        //layout: "centered",
    },
    argTypes: {
        // remove from ui
        children: { table: { disable: true } },
        className: { table: { disable: true } },
    },
    args: {},
} satisfies Meta<typeof CenterV>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <span className="bg-amber-300">i am centered vertically</span>,
        className: "border",
        style: { height: "300px", width: "200px" },
    },
};
// ---- STORIES ----
