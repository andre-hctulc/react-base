import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../../../components/input";

// #### META ####
const meta = {
    title: "input/input",
    component: Input,
    parameters: {
        layout: "centered",
    },
    argTypes: {},
    args: {},
} satisfies Meta<typeof Input>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    // name: "I am primary",
    args: { placeholder: "Type here …" },
};
// ---- STORIES ----
