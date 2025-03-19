import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "../../../components/data-display/index.js";

// #### META ####
const meta = {
    title: "data-display/alert",
    component: Alert,
    parameters: {
        //layout: "centered",
    },
    argTypes: {
        type: { control: "radio", options: ["info", "error", "success", "warning"] },
        outlined: { control: "boolean" },
        rounded: { control: "radio", options: ["md", "sm", "base", "lg", "xl", "none"] },
        // remove from ui
        style: { table: { disable: true } },
        className: { table: { disable: true } },
        closeButtonProps: { table: { disable: true } },
        as: { table: { disable: true } },
        onClose: { table: { disable: true } },
        titleProps: { table: { disable: true } },
        loading: { table: { disable: true } },
        closable: { table: { disable: true } },
    },
    args: { title: "Some Alert text", rounded: "md" },
} satisfies Meta<typeof Alert>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => <Alert {...args} />,
    args: {},
};
// ---- STORIES ----
