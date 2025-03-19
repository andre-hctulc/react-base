import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "../../../components/input/radio.js";
import type { Choice } from "../../../types/index.js";

// #### META ####
const meta = {
    title: "input/radio",
    component: Radio,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        // remove from ui
        options: { table: { disable: true } },
        renderOption: { table: { disable: true } },
        defaultValue: { table: { disable: true } },
        value: { table: { disable: true } },
        onChange: { table: { disable: true } },
        name: { table: { disable: true } },
        required: { table: { disable: true } },
        readOnly: { table: { disable: true } },
        id: { table: { disable: true } },
        style: { table: { disable: true } },
        className: { table: { disable: true } },
        icon: { table: { disable: true } },
    },
    args: {},
} satisfies Meta<typeof Radio>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

const options: Choice<unknown>[] = [{ value: "choice1", data: "data" }, { value: "choice2" }];

export const Default: Story = {
    render: args => (
        <>
            <span className="text-red">TODO</span>
            <Radio options={options} renderOption={opt => <span>{opt.option.value}</span>} />
        </>
    ),
    args: { options, renderOption: () => <></> },
};
// ---- STORIES ----
