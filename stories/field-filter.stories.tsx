import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FieldFilter } from "../src/components/field-filter.js";

const meta = { title: "Components/FieldFilter" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const DefaultExample: FC = () => {
    return <FieldFilter label="Created at" type="date" showTypeSelector />;
};

export const Default: Story = {
    render: () => <DefaultExample />,
};
