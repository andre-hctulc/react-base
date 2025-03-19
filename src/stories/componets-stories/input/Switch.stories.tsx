import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../../../components/input/switch.js";

// #### META ####
const meta = {
    title: "input/switch",
    component: Switch,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        color: { control: "select", options: ["primary", "secondary", "accent", "error", "success", "warning", "info"] },
        // remove from ui
        value: { table: { disable: true } },
        disabled: { table: { disable: true } },
        defaultValue: { table: { disable: true } },
        readOnly: { table: { disable: true } },
        onChange: { table: { disable: true } },
        name: { table: { disable: true } },
        required: { table: { disable: true } },
        id: { table: { disable: true } },
        style: { table: { disable: true } },
        className: { table: { disable: true } },
    },
    args: {},
} satisfies Meta<typeof Switch>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => <Switch />,
    args: {},
};
// ---- STORIES ----
