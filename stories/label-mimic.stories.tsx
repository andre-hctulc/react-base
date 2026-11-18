import type { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LabelMimic } from "../src/components/label-mimic.js";

const meta = { title: "Components/LabelMimic" } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const DefaultExample: FC = () => {
    return <LabelMimic color="warning">Pending review</LabelMimic>;
};

export const Default: Story = { render: () => <DefaultExample /> };
