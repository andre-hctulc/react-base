import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "../../../components/input";
import type { Choice } from "../../../types";

// #### META ####
const meta = {
    title: "input/radio",
    component: Radio,
    parameters: {
        layout: "centered",
    },
    argTypes: {},
    args: {},
} satisfies Meta<typeof Radio>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

const choices: Choice<unknown>[] = [{ value: "choice1", data: "data" }, { value: "choice2" }];

export const Default: Story = {
    args: { options: choices, renderOption: () => null },
};
// ---- STORIES ----
