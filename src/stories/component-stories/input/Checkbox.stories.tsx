import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../../../components/input/checkbox.js";

// #### META ####
const meta = {
    title: "input/checkbox",
    component: Checkbox,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        value: { control: "boolean" },
        size: { control: "select", options: ["sm", "md", "lg"] },
        color: { control: "select", options: ["default", "primary", "secondary", "accent", "danger", "warning"] },
        // remove from ui
        style: { table: { disable: true } },
        icon: { table: { disable: true } },
        className: { table: { disable: true } },
        id: { table: { disable: true } },
        required: { table: { disable: true } },
        name: { table: { disable: true } },
        onChange: { table: { disable: true } },
        defaultValue: { table: { disable: true } },
        readOnly: { table: { disable: true } },
    },
    args: {},
} satisfies Meta<typeof Checkbox>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
// ---- STORIES ----

<Checkbox></Checkbox>;
