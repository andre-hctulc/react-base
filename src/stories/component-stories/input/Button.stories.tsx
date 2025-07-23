import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../../components/input/button.js";
import { InfoCircleIcon } from "../../../components/icons/info-circle.js";

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
        loading: { control: { type: "boolean" } },
        disabled: { control: "boolean" },
        children: { control: "text", name: "text" },
        iconPosition: { control: "select", options: ["left", "right"] },
        shape: { control: "select", options: ["pill", "rounded_lg", "rounded_md", "rounded_sm", "square"] },
        shadow: { control: "select", options: ["xl", "lg", "md"] },
        size: { control: "select", options: ["md", "xs", "sm", "lg", "xl"] },

        // remove from ui
        style: { table: { disable: true } },
        as: { table: { disable: true } },
        icon: { table: { disable: true } },
        className: { table: { disable: true } },
        href: { table: { disable: true } },
    },
    args: {},
} satisfies Meta<typeof Button>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { children: "Button" },
};

export const ButtonLoading: Story = {
    args: { children: "Button", loading: true },
};

export const ButtonWithIcon: Story = {
    args: { children: "Button", icon: <InfoCircleIcon /> },
};
// ---- STORIES ----
