import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "../../../components/dialog/index.js";
import { IconButton } from "../../../components/index.js";
import { InfoCircleIcon } from "../../../components/icons/info-circle.js";

// #### META ####
const meta = {
    title: "dialog/popover",
    component: Popover,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        open: { control: "boolean" },
        // TODO position
        // remove from ui
        style: { table: { disable: true } },
        anchor: { table: { disable: true } },
        className: { table: { disable: true } },
        children: { table: { disable: true } },
        frameMargin: { table: { disable: true } },
        onClose: { table: { disable: true } },
        zIndex: { table: { disable: true } },
        portal: { table: { disable: true } },
    },
    args: { className: "bg-red" },
} satisfies Meta<typeof Popover>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => (
        <>
            {/* // ? TODO how to set an anchor */}
            <IconButton variant="filled">
                <InfoCircleIcon />
            </IconButton>
            <Popover {...args}>popover content</Popover>
        </>
    ),
    args: { anchor: undefined, open: true },
};
// ---- STORIES ----
