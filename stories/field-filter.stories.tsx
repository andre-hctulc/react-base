import type { Meta, StoryObj } from "@storybook/react-vite";
import { FieldFilter } from "../src/components/field-filter.js";

const meta = { title: "Components/FieldFilter" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <FieldFilter label="Created at" type="date" showTypeSelector />,
};
