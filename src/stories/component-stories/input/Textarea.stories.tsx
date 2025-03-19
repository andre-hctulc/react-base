import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "../../../components/input/textarea.js";

// #### META ####
const meta = {
    title: "input/textarea",
    component: Textarea,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        value: { table: { disable: true } },
        disabled: { table: { disable: true } },
        defaultValue: { table: { disable: true } },
        readOnly: { table: { disable: true } },
        onChange: { table: { disable: true } },
        name: { table: { disable: true } },
        required: { table: { disable: true } },
        id: { table: { disable: true } },
        style: { table: { disable: true } },
        className: { table: { disable: true } },
    },
    args: {},
} satisfies Meta<typeof Textarea>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => <Textarea placeholder={args.placeholder} />,
    args: { placeholder: "Type here …" },
};
// ---- STORIES ----
