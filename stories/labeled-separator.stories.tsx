import type { Meta, StoryObj } from "@storybook/react-vite";
import { LabeledSeparator } from "../src/components/labeled-separator.js";

const meta = { title: "Components/LabeledSeparator" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <LabeledSeparator>Profile</LabeledSeparator>,
};
