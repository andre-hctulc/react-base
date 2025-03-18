import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../../../components/input";

// #### META ####
const meta = {
    title: "input/switch",
    component: Switch,
    parameters: {
        layout: "centered",
    },
    argTypes: {},
    args: {},
} satisfies Meta<typeof Switch>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { value: true },
};
// ---- STORIES ----
