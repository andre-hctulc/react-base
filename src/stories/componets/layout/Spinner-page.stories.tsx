import type { Meta, StoryObj } from "@storybook/react";
import { SpinnerPage } from "../../../components/layout";

// #### META ####
const meta = {
    title: "layout/SpinnerPage",
    component: SpinnerPage,
    parameters: {
        layout: "centered",
    },
    argTypes: {},
} satisfies Meta<typeof SpinnerPage>;

export default meta;
// #### META ####

// ---- STORIES ----
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: args => <SpinnerPage />,
    args: {},
};
// ---- STORIES ----
