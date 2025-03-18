import type { Meta, StoryObj } from "@storybook/react";
import { CollapseH500 } from "../../../components/transitions";

// #### META ####
const meta = {
    title: "transition/collapseh500",
    component: CollapseH500,
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof CollapseH500>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { children: <span>children</span>, show: true },
};
// ---- STORIES ----
