import type { Meta, StoryObj } from "@storybook/react";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "../../../components/dialog";

// #### META ####
const meta = {
    title: "dialog/dialog",
    component: Dialog,
    parameters: {
        //layout: "centered",
    },
    argTypes: { open: { control: "boolean" } },
} satisfies Meta<typeof Dialog>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => (
        <Dialog open={args.open}>
            <DialogHeader title="Dialog Title" actions={<span>actions</span>} />
            <DialogBody>Dialog body</DialogBody>
            <DialogFooter>footer</DialogFooter>
        </Dialog>
    ),
    args: { open: true },
};
// ---- STORIES ----
