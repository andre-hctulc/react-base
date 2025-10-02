import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "../../../components/input/icon-button.js";
import { InfoCircleIcon } from "../../../components/icons/phosphor/info-circle.js";

// #### META ####
const meta = {
    title: "input/iconButton",
    component: IconButton,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        variant: { control: "select", options: ["filled", "floating", "outlined", "text", "pale"] },
        color: {
            control: "select",
            options: ["error", "accent", "black", "info", "pale", "neutral", "secondary", "primary"],
        },
        loading: { control: { type: "boolean" } },
        disabled: { control: "boolean" },
        shape: { control: "select", options: ["pill", "rounded_lg", "rounded_md", "rounded_sm", "square"] },
        shadow: { control: "select", options: ["xl", "lg", "md"] },
        size: { control: "select", options: ["md", "xs", "sm", "lg", "xl"] },

        // remove from ui
        style: { table: { disable: true } },
        as: { table: { disable: true } },
        className: { table: { disable: true } },
        href: { table: { disable: true } },
        children: { table: { disable: true } },
    },
    args: { variant: "filled" },
} satisfies Meta<typeof IconButton>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { children: <InfoCircleIcon /> },
};
// ---- STORIES ----
