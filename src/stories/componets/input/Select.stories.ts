import type { Meta, StoryObj } from "@storybook/react";
import { Select, type SelectOption } from "../../../components/input";

// #### META ####
const meta = {
    title: "input/select",
    component: Select,
    parameters: {
        layout: "centered",
    },
    argTypes: {},
    args: {},
} satisfies Meta<typeof Select>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

const options: SelectOption<string>[] = [
    { label: "Option1", data: "xxx", value: "opt1" },
    { label: "Option2", data: "yyy", value: "opt2" },
];

export const Default: Story = {
    args: { options, value: ["opt1"] },
};
// ---- STORIES ----
