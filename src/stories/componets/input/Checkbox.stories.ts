import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../../../components/input";

// #### META ####
const meta = {
    title: "input/checkbox",
    component: Checkbox,
    parameters: {
        layout: "centered",
    },
    argTypes: { value: { control: "boolean" } },
    args: {},
} satisfies Meta<typeof Checkbox>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        defaultValue: false,
        value: true
    },
};
// ---- STORIES ----
