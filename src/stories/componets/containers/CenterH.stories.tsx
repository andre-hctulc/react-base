import type { Meta, StoryObj } from "@storybook/react";
import { CenterH } from "../../../components/containers";

// #### META ####
const meta = {
    title: "containers/centerH",
    component: CenterH,
    parameters: {
        layout: "centered",
    },
    argTypes: {},
    args: {},
} satisfies Meta<typeof CenterH>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <span>i am centered horizontally</span>,
    },
};
// ---- STORIES ----
