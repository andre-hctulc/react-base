import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../../../components/input/input.js";

// #### META ####
const meta = {
    title: "input/input",
    component: Input,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        value: { control: "text" },
        size: { control: "select", options: ["sm", "md", "lg"] },
        // remove from ui
        defaultValue: { table: { disable: true } },
        onChange: { table: { disable: true } },
        name: { table: { disable: true } },
        required: { table: { disable: true } },
        readOnly: { table: { disable: true } },
        id: { table: { disable: true } },
    },
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
