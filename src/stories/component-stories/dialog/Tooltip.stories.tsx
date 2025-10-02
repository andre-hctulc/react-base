import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "../../../components/dialog/index.js";
import { IconButton } from "../../../components/index.js";
import { InfoCircleIcon } from "../../../components/icons/phosphor/info-circle.js";

// #### META ####
const meta = {
    title: "dialog/tooltip",
    component: Tooltip,
    parameters: {
        layout: "centered",
    },
    argTypes: {},
} satisfies Meta<typeof Tooltip>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

// TODO stories from tooltip left, top, right and bottom
export const Default: Story = {
    render: (args) => (
        <>
            <Tooltip content={args.content}>
                <IconButton>
                    <InfoCircleIcon />
                </IconButton>
            </Tooltip>
        </>
    ),
    args: { content: "Tooltip content", children: <></> },
};
// ---- STORIES ----
