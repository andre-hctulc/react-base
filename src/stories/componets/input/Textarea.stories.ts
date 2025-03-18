import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "../../../components/input";

// #### META ####
const meta = {
    title: "input/textarea",
    component: Textarea,
    parameters: {
        layout: "centered",
    },
    argTypes: {},
    args: {},
} satisfies Meta<typeof Textarea>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { placeholder: "Type here …" },
};
// ---- STORIES ----
