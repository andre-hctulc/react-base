import type { Meta, StoryObj } from "@storybook/react";
import { Select, type SelectOption } from "../../../components/input/select.js";
import { InfoCircleIcon } from "../../../components/icons/phosphor/info-circle.js";

// #### META ####
const meta = {
    title: "input/select",
    component: Select,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        disabled: { control: "boolean" },
        loading: { control: "boolean" },
        loadingText: { control: "text" },
        size: { control: "select", options: ["sm", "md", "lg"] },
        // remove from ui
        options: { table: { disable: true } },
        defaultValue: { table: { disable: true } },
        readOnly: { table: { disable: true } },
        onChange: { table: { disable: true } },
        name: { table: { disable: true } },
        required: { table: { disable: true } },
        id: { table: { disable: true } },
        style: { table: { disable: true } },
        className: { table: { disable: true } },
        icon: { table: { disable: true } },
        placeholder: { table: { disable: true } },
        multiple: { table: { disable: true } },
        renderSelected: { table: { disable: true } },
    },
    args: {},
} satisfies Meta<typeof Select>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

const options: SelectOption<string>[] = [
    { label: "Select value", data: "", value: "", disabled: true, defaultChecked: false },
    { label: "Option 1", data: "xxx", value: "opt1" },
    { label: "Option 2", data: "yyy", value: "opt2" },
    { label: "Option 3", data: "zzz", value: "opt3", icon: <InfoCircleIcon /> },
];

export const Default: Story = {
    render: (args) => <Select options={args.options} defaultValue={args.defaultValue} />,
    args: { options, defaultValue: [""] },
};

export const MultipleOptions: Story = {
    render: (args) => <Select options={args.options} defaultValue={args.defaultValue} multiple />,
    args: { options, defaultValue: ["opt1"] },
};

export const CustomIcon: Story = {
    render: (args) => (
        <Select options={args.options} defaultValue={args.defaultValue} icon={<InfoCircleIcon />} />
    ),
    args: { options, defaultValue: ["opt1"] },
};
// ---- STORIES ----
