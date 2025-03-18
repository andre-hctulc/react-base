import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../../components/input";

// #### META ####
const meta = {
    title: "input/button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        variant: { control: "select", options: ["filled", "floating", "outlined", "text", "pale"] },
        color: { control: "select", options: ["error", "accent", "black", "info", "pale", "neutral", "secondary", "primary"] },
        loading: { control: "boolean" },
        disabled: { control: "boolean" },
        children: { control: "text" },
    },
    args: { color: "error" },
} satisfies Meta<typeof Button>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { variant: "filled", children: "Button" },
};
// ---- STORIES ----
