import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "../../../components/data-display/index.js";
import { InfoCircleIcon } from "../../../components/icons/info-circle.js";

// #### META ####
const meta = {
    title: "data-display/chip",
    component: Chip,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        color: { control: "radio", options: ["neutral", "black", "primary", "secondary", "error", "success", "warning", "info", "accent"] },
        // remove from ui
        style: { table: { disable: true } },
        className: { table: { disable: true } },
        hoverEffect: { table: { disable: true } },
        as: { table: { disable: true } },
        clickable: { table: { disable: true } },
        icon: { table: { disable: true } },
    },
    args: { color: "neutral" },
} satisfies Meta<typeof Chip>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => (
        <Chip {...args}>
            <span>some content</span>
        </Chip>
    ),
    args: {},
};

export const ChipWithIcon: Story = {
    render: args => (
        <Chip {...args}>
            <span>some content</span>
        </Chip>
    ),
    args: { icon: <InfoCircleIcon />, iconPosition: "left" },
};
// ---- STORIES ----
