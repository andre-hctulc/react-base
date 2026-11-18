import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LabeledSeparator } from "../src/components/labeled-separator.js";

const meta = { title: "Components/LabeledSeparator" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const DefaultExample: FC = () => {
    return <LabeledSeparator>Profile</LabeledSeparator>;
};

export const Default: Story = {
    render: () => <DefaultExample />,
};
