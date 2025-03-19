import type { Meta, StoryObj } from "@storybook/react";
import { CenterH } from "../../../components/containers/center.js";

// #### META ####
const meta = {
    title: "containers/centerH",
    component: CenterH,
    parameters: {
        //layout: "centered",
    },
    argTypes: {
        // remove from ui
        children: { table: { disable: true } },
        className: { table: { disable: true } },
    },
    args: {},
} satisfies Meta<typeof CenterH>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <span className="bg-amber-300">i am centered horizontally</span>,
        className: "border",
        style: { height: "300px", width: "500px" },
    },
};
// ---- STORIES ----
