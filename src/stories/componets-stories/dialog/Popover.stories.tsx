import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "../../../components/dialog/index.js";
import { IconButton } from "../../../components/index.js";
import { InfoCircleIcon } from "../../../components/icons/info-circle.js";

// #### META ####
const meta = {
    title: "dialog/popover",
    component: Popover,
    parameters: {
        //layout: "centered",
    },
    argTypes: { open: { control: "boolean" } },
} satisfies Meta<typeof Popover>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => (
        <>
            {/* // ? TODO how to set an anchor */}
            <IconButton>
                <InfoCircleIcon />
            </IconButton>
            <Popover open={args.open} anchor={args.anchor}>
                popover content
            </Popover>
        </>
    ),
    args: { anchor: undefined, open: true },
};
// ---- STORIES ----
